import type { CountryCode } from './country';

export type TrackId =
  | 'it_ai'
  | 'engineering_trades'
  | 'nursing_health'
  | 'early_childhood'
  | 'finance_business'
  | 'biotech_pharma'
  | 'hospitality_culinary'
  | 'creative_design';

export interface TrackScoreBreakdown {
  policyFriendliness: number;  // 政策友好度 (0~10, weight: 35%)
  prCertainty: number;         // 永居确定性 (0~10, weight: 30%)
  jobAndSalaryMatch: number;   // 就业薪资对口度 (0~10, weight: 25%)
  lowBarrierIndex: number;     // 低壁垒指数 (0~10, weight: 10%)
  compositeScore: number;      // 综合加权得分
  tier: 'GREEN' | 'YELLOW' | 'RED';
  tierLabel: string;
}

export interface TrackCountryDetail {
  countryCode: CountryCode;
  countryName: string;
  flag: string;
  scores: TrackScoreBreakdown;
  headlineMetric: string;      // 专业专属指标标语
  summary: string;             // 针对该专业的深度剖析 (100%对齐当前赛道)
  fatalBottlenecks: string[];  // 针对该专业的 2~3 个精准痛点与劝退真相
  recommendedVisas: {
    id: string;
    code: string;
    name: string;
    highlight: string;
  }[];
  humorTip?: string;           // 针对高压难留赛道的幽默点评与文书/申请对冲引导
}

export interface ProfessionalTrack {
  id: TrackId;
  name: string;
  shortName: string;
  icon: string;
  hotness: string;
  summary: string;
  countryRankings: Record<string, TrackCountryDetail>;
}

export function calculateTrackScore(
  policy: number,
  pr: number,
  job: number,
  barrier: number
): TrackScoreBreakdown {
  const compositeScore = Number(
    (policy * 0.35 + pr * 0.3 + job * 0.25 + barrier * 0.1).toFixed(1)
  );
  let tier: 'GREEN' | 'YELLOW' | 'RED' = 'YELLOW';
  let tierLabel = '适中 · 需策略加分';
  if (compositeScore >= 8.5) {
    tier = 'GREEN';
    tierLabel = '宽松 · 红利直通';
  } else if (compositeScore < 6.8) {
    tier = 'RED';
    tierLabel = '紧缩 · 高压劝退';
  }
  return {
    policyFriendliness: policy,
    prCertainty: pr,
    jobAndSalaryMatch: job,
    lowBarrierIndex: barrier,
    compositeScore,
    tier,
    tierLabel,
  };
}
