import jsonLogic from 'json-logic-js';
import type {
  CapGroupSummary,
  CapStrategy,
  EvaluationResult,
  ImprovementScenario,
  PolicyRule,
  RuleEvaluationItem,
  UserProfile,
  Visa,
} from '@emigrant/shared';

export interface EvaluationOptions {
  profile: UserProfile;
  visa: Visa;
  rules: PolicyRule[];
}

export function evaluateProfile(options: EvaluationOptions): EvaluationResult {
  const { profile, visa, rules } = options;

  const ruleBreakdown: RuleEvaluationItem[] = [];
  const disqualificationReasons: string[] = [];
  const scoreByCategory: Record<string, number> = {};

  // Group matched rules by capGroup
  const capGroups: Record<
    string,
    {
      strategy: CapStrategy;
      capLimit: number;
      rules: { rule: PolicyRule; points: number }[];
    }
  > = {};

  let meetsMandatoryRequirements = true;

  // 1. Evaluate each rule
  for (const rule of (rules || [])) {
    let matched = false;
    try {
      // Evaluate against the unified context { profile, visa }
      matched = Boolean(jsonLogic.apply(rule.logic, { profile, visa }));
    } catch (err) {
      console.error(`Error evaluating rule ${rule.code}:`, err);
      matched = false;
    }

    const rawPoints = matched ? (rule.points || 0) : 0;

    // Check mandatory rule violations
    if (rule.isMandatory) {
      if (!matched) {
        meetsMandatoryRequirements = false;
        disqualificationReasons.push(rule.description || `${rule.chineseName} (未达硬性要求)`);
      }
    }

    // Register rule evaluation item
    const item: RuleEvaluationItem = {
      ruleId: rule.id,
      ruleCode: rule.code,
      category: rule.category,
      name: rule.name,
      chineseName: rule.chineseName,
      matched,
      isMandatory: rule.isMandatory,
      rawPoints,
      appliedPoints: 0, // will be computed in cap consolidation
      capGroup: rule.capGroup,
      description: rule.description,
    };

    ruleBreakdown.push(item);

    if (matched && rawPoints > 0) {
      if (rule.capGroup) {
        if (!capGroups[rule.capGroup]) {
          capGroups[rule.capGroup] = {
            strategy: rule.capStrategy || 'max_of',
            capLimit: rule.capLimit ?? Infinity,
            rules: [],
          };
        }
        capGroups[rule.capGroup]!.rules.push({ rule, points: rawPoints });
      }
    }
  }

  // 2. Resolve Cap Groups and calculate Applied Points
  const capGroupSummaries: Record<string, CapGroupSummary> = {};

  // Map for fast breakdown lookup
  const breakdownMap = new Map<string, RuleEvaluationItem>();
  for (const item of ruleBreakdown) {
    breakdownMap.set(item.ruleCode, item);
  }

  // Process rules with NO capGroup first
  for (const item of ruleBreakdown) {
    if (item.matched && !item.capGroup && item.rawPoints > 0) {
      item.appliedPoints = item.rawPoints;
      scoreByCategory[item.category] = (scoreByCategory[item.category] || 0) + item.appliedPoints;
    }
  }

  // Process each capGroup according to its strategy
  for (const [groupName, groupData] of Object.entries(capGroups)) {
    if (groupData.rules.length === 0) continue;

    const rawTotal = groupData.rules.reduce((acc, r) => acc + r.points, 0);
    let appliedGroupTotal = 0;
    let selectedRuleCode: string | undefined;

    if (groupData.strategy === 'max_of' || groupData.strategy === 'exclusive_choice') {
      // Pick the single highest scoring matched rule
      let maxRule = groupData.rules[0]!;
      for (const r of groupData.rules) {
        if (r.points > maxRule.points) {
          maxRule = r;
        }
      }

      appliedGroupTotal = Math.min(maxRule.points, groupData.capLimit);
      selectedRuleCode = maxRule.rule.code;

      // Apply score to the chosen rule in breakdown
      const item = breakdownMap.get(maxRule.rule.code);
      if (item) {
        item.appliedPoints = appliedGroupTotal;
        scoreByCategory[item.category] = (scoreByCategory[item.category] || 0) + item.appliedPoints;
      }
    } else if (groupData.strategy === 'sum_up_to_max') {
      // Sum all, capped at capLimit
      let remainingCap = groupData.capLimit;
      for (const r of groupData.rules) {
        const item = breakdownMap.get(r.rule.code);
        if (item) {
          const alloc = Math.min(r.points, remainingCap);
          item.appliedPoints = alloc;
          remainingCap = Math.max(0, remainingCap - alloc);
          appliedGroupTotal += alloc;
          scoreByCategory[item.category] = (scoreByCategory[item.category] || 0) + alloc;
        }
      }
    }

    capGroupSummaries[groupName] = {
      capGroup: groupName,
      strategy: groupData.strategy,
      capLimit: groupData.capLimit === Infinity ? appliedGroupTotal : groupData.capLimit,
      rawPoints: rawTotal,
      appliedPoints: appliedGroupTotal,
      contributingRuleCodes: groupData.rules.map((r) => r.rule.code),
      selectedRuleCode,
    };
  }

  // 3. Compute Total Score & Pass State
  const totalScore = Object.values(scoreByCategory).reduce((acc, curr) => acc + curr, 0);
  const passThreshold = totalScore >= visa.thresholdScore;
  const isEligible = meetsMandatoryRequirements && passThreshold;

  // 4. Generate Gap Analysis & Improvement Scenarios
  const pointsShortage = Math.max(0, visa.thresholdScore - totalScore);
  const potentialScenarios: ImprovementScenario[] = generateImprovementScenarios(profile, visa);

  const quickWinSuggestions: string[] = [];
  if (pointsShortage > 0) {
    quickWinSuggestions.push(`当前总分 ${totalScore} 分，距基准线 ${visa.thresholdScore} 分还差 ${pointsShortage} 分`);
  }
  for (const s of potentialScenarios.slice(0, 3)) {
    quickWinSuggestions.push(`${s.scenarioTitle}: +${s.potentialAdditionalPoints}分 (${s.description})`);
  }

  return {
    visaId: visa.id,
    visaName: visa.chineseName || visa.name,
    countryCode: visa.countryCode,
    isEligible,
    meetsMandatoryRequirements,
    passThreshold,
    totalScore,
    thresholdScore: visa.thresholdScore,
    disqualificationReasons,
    scoreByCategory,
    capGroupSummaries,
    ruleBreakdown,
    gapAnalysis: {
      pointsShortage,
      criticalDeficiencies: disqualificationReasons,
      quickWinSuggestions,
      potentialScenarios,
    },
    evaluatedAt: new Date().toISOString(),
  };
}

function generateImprovementScenarios(
  profile: UserProfile,
  visa: Visa
): ImprovementScenario[] {
  const scenarios: ImprovementScenario[] = [];

  // 1. Language Boost Detection
  if (profile.language.computedAUBand !== 'Superior' && (visa.countryCode === 'AU' || visa.countryCode === 'NZ')) {
    scenarios.push({
      scenarioTitle: '提升语言至 PTE 79+ / 雅思 8 炸 (Superior)',
      category: 'language',
      potentialAdditionalPoints: profile.language.computedAUBand === 'Proficient' ? 10 : 20,
      effortLevel: 'medium',
      description: '达到 Superior English 可将语言加分直接拉满至 20 分',
      actionableStep: '备考 PTE 强化打卡，突破四项 79 分',
    });
  }

  // 2. State Nomination Bonus
  if (visa.countryCode === 'AU' && visa.code === '189') {
    scenarios.push({
      scenarioTitle: '增加 190 州担保通道 (Subclass 190)',
      category: 'state_nomination',
      potentialAdditionalPoints: 5,
      effortLevel: 'low',
      description: '申请目标州 190 州担保，获批可直接获赠 5 分',
      actionableStep: '确认目标州职业清单并在 SkillSelect 中勾选 190',
    });
    scenarios.push({
      scenarioTitle: '转投 491 偏远地区州担保 (Subclass 491)',
      category: 'state_nomination',
      potentialAdditionalPoints: 15,
      effortLevel: 'low',
      description: '偏远地区州担保可直接获赠 15 分超高加分',
      actionableStep: '评估偏远地区工作或生活意向，申请 491 担保',
    });
  }

  // 3. Partner Points
  if (profile.partner.hasPartner && !profile.partner.hasCompetentEnglish) {
    scenarios.push({
      scenarioTitle: '伴侣考取 Competent English (雅思6分/PTE 50+)',
      category: 'partner',
      potentialAdditionalPoints: 5,
      effortLevel: 'low',
      description: '伴侣满足基础英文即可为申请人贡献 5 分',
      actionableStep: '安排伴侣参加 PTE/雅思考试',
    });
  }

  // 4. NZ Work Experience Accumulation
  if (visa.countryCode === 'NZ' && visa.code === 'SMC') {
    if (profile.experience.localYears < 3) {
      scenarios.push({
        scenarioTitle: `积累新西兰本地技术工签经验 (${profile.experience.localYears + 1} 年)`,
        category: 'experience_local',
        potentialAdditionalPoints: 1,
        effortLevel: 'medium',
        description: '每积累 1 年新西兰全职技能工作经验，可增加 1 分（最多加 3 分）',
        actionableStep: '保持合规 AEWV 签证全职工作并按时缴纳 PAYE 税',
      });
    }
  }

  return scenarios;
}
