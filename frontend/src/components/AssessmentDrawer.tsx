import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ArrowRight,
  DollarSign,
  Languages,
  Briefcase,
  GraduationCap,
  Calendar,
  HeartHandshake,
  Award,
  Compass,
  Target,
  BookmarkCheck,
  CheckCircle2,
  FolderKanban,
  Clock,
  FileText,
  Building2,
  Check,
  School,
  Edit3,
  Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type {
  CountryCode,
  MaritalStatus,
  EducationTier,
  CareerFieldCategory,
  CertificationStatus,
  EnglishBandTier,
  SecondLanguage,
  BudgetTier,
  PathwayPreference,
  CorePriority,
  GlobalTierMatchItem,
  UserAssessmentRecord,
  CuratedPathwayTier,
  MultiDimAssessmentProfile,
} from '@emigrant/shared';
import { useAuth } from '../context/AuthContext';
import { saveAssessmentRecord } from '../services/api';
import { ReportUnlockModal } from './ReportUnlockModal';
import { AssessmentCalculatingView } from './AssessmentCalculatingView';

interface AssessmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  targetCountry?: CountryCode;
  onSelectCountry?: (country: CountryCode) => void;
  onOpenSavedHistory?: () => void;
  initialRecord?: UserAssessmentRecord | null;
  onOpenConsultation?: (context?: string, isPromo?: boolean) => void;
  unlockedAssessmentIds?: string[];
}

export const AssessmentDrawer: React.FC<AssessmentDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  onOpenSavedHistory,
  initialRecord,
  onOpenConsultation,
  unlockedAssessmentIds = [],
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();

  const isPrivilegeUnlocked = Boolean(
    unlockedAssessmentIds && (
      unlockedAssessmentIds.length > 0 ||
      unlockedAssessmentIds.includes('ALL') ||
      unlockedAssessmentIds.includes('CURRENT') ||
      (initialRecord && unlockedAssessmentIds.includes(initialRecord.id))
    )
  );

  // Wizard Step: 1 ~ 6 for questions, 7 for Results
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Hydrate from initialRecord when viewing a saved assessment from history
  useEffect(() => {
    if (isOpen && initialRecord) {
      const p = (initialRecord.profileSnapshot as any) || {};
      if (p.age) setAge(p.age);
      if (p.maritalStatus) setMaritalStatus(p.maritalStatus);
      if (p.domesticCityTier) setDomesticCityTier(p.domesticCityTier);
      if (p.departureMotivations) setDepartureMotivations(p.departureMotivations);
      if (p.educationLevel) setEducationLevel(p.educationLevel);
      if (p.fieldCategory) setFieldCategory(p.fieldCategory);
      if (p.specificJobOrMajor) setSpecificJobOrMajor(p.specificJobOrMajor);
      if (p.techStackFocus) setTechStackFocus(p.techStackFocus);
      if (p.medicalLicenseStatus) setMedicalLicenseStatus(p.medicalLicenseStatus);
      if (p.tradesSubCategory) setTradesSubCategory(p.tradesSubCategory);
      if (p.businessCareerStrategy) setBusinessCareerStrategy(p.businessCareerStrategy);
      if (p.experienceYears !== undefined) setExperienceYears(p.experienceYears);
      if (p.yearsOfExperience !== undefined) setExperienceYears(p.yearsOfExperience);
      if (p.certificationStatus) setCertificationStatus(p.certificationStatus);
      if (p.englishBand) setEnglishBand(p.englishBand);
      if (p.secondLanguage) setSecondLanguage(p.secondLanguage);
      if (p.secondLanguageIntent) setSecondLanguageIntent(p.secondLanguageIntent);
      if (p.lonelinessTolerance) setLonelinessTolerance(p.lonelinessTolerance);
      if (p.budgetTier) setBudgetTier(p.budgetTier);
      if (p.pathwayPreference) setPathwayPreference(p.pathwayPreference);
      if (p.corePriority) setCorePriority(p.corePriority);

      if (Array.isArray(initialRecord.resultSnapshot) && initialRecord.resultSnapshot.length > 0) {
        setResults(initialRecord.resultSnapshot as GlobalTierMatchItem[]);
        setCurrentStep(7);
      }
    } else if (isOpen && !initialRecord && currentStep === 7 && !results) {
      setCurrentStep(1);
    }
  }, [isOpen, initialRecord]);

  // =========================================================================
  // 1. 基础属性与国内现状背景调研 (Base Attributes & Domestic Background - 无预设默认值)
  // =========================================================================
  const [age, setAge] = useState<number | null>(null);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);
  const [domesticCityTier, setDomesticCityTier] = useState<
    'tier1_megacity' | 'new_tier1' | 'tier2_tier3' | 'tier4_tier5_county' | null
  >(null);
  const [departureMotivations, setDepartureMotivations] = useState<string[]>([]);

  // =========================================================================
  // 2. 意向攻读最高学历与专业赛道 (Target Degree & Track - 无预设默认值)
  // =========================================================================
  const [educationLevel, setEducationLevel] = useState<EducationTier | null>(null);
  const [fieldCategory, setFieldCategory] = useState<CareerFieldCategory | null>(null);
  const [specificJobOrMajor, setSpecificJobOrMajor] = useState<string>('');

  // 2.1 Role-Specific Dynamic Branching States
  const [techStackFocus, setTechStackFocus] = useState<string | null>(null);
  const [medicalLicenseStatus, setMedicalLicenseStatus] = useState<string | null>(null);
  const [highScoreWillingness, setHighScoreWillingness] = useState<boolean>(true);
  const [tradesSubCategory, setTradesSubCategory] = useState<string | null>(null);
  const [businessCareerStrategy, setBusinessCareerStrategy] = useState<string | null>(null);

  // =========================================================================
  // 3. 实战经验与资格认证 (Experience & Certification - 无预设默认值)
  // =========================================================================
  const [experienceYears, setExperienceYears] = useState<number | null>(null);
  const [certificationStatus, setCertificationStatus] = useState<CertificationStatus | null>(null);

  // =========================================================================
  // 4. 语言水平、二外投入意愿与欧陆适应度 (Language, Second Lang & Loneliness - 无预设默认值)
  // =========================================================================
  const [englishBand, setEnglishBand] = useState<EnglishBandTier | null>(null);
  const [secondLanguage, setSecondLanguage] = useState<SecondLanguage>('none');
  const [secondLanguageIntent, setSecondLanguageIntent] = useState<
    'strict_english_only' | 'willing_to_learn_b1' | 'has_intermediate_foundation' | null
  >(null);
  const [lonelinessTolerance, setLonelinessTolerance] = useState<
    'can_tolerate_solitude' | 'afraid_of_isolation' | null
  >(null);

  // =========================================================================
  // 5. 预算与偏好路径 (Budget & Pathway Preference - 无预设默认值)
  // =========================================================================
  const [budgetTier, setBudgetTier] = useState<BudgetTier | null>(null);
  const [pathwayPreference, setPathwayPreference] = useState<PathwayPreference | null>(null);

  // =========================================================================
  // 6. 核心诉求第一优先级 (Core Priority - 无预设默认值)
  // =========================================================================
  const [corePriority, setCorePriority] = useState<CorePriority | null>(null);

  // Results & UI Filters
  const [results, setResults] = useState<GlobalTierMatchItem[] | null>(null);
  const [activeTierFilter, setActiveTierFilter] = useState<'ALL' | 'tier1' | 'tier2' | 'tier3'>('ALL');
  const [unlockedTimelineCountry, setUnlockedTimelineCountry] = useState<string | null>(null);
  const [unlockedCuratedCountry, setUnlockedCuratedCountry] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Monetization Modal State (B2C Paid Report only; B2B hidden per directive)
  const [selectedReportCountry, setSelectedReportCountry] = useState<GlobalTierMatchItem | null>(null);

  const toggleMotivation = (key: string) => {
    if (departureMotivations.includes(key)) {
      setDepartureMotivations(departureMotivations.filter((k) => k !== key));
    } else {
      setDepartureMotivations([...departureMotivations, key]);
    }
  };

  // Calculate 14-Country Tier Matrix based on full 6-dimensional profile + dynamic branch weights
  
  // Step Validation Error State
  const [stepValidationError, setStepValidationError] = useState<string | null>(null);

  // Clear validation error whenever step changes
  useEffect(() => {
    setStepValidationError(null);
  }, [currentStep]);

  // Validation function per step (强制要求客户自主完成每一步选择)
  const getStepValidation = (): { isValid: boolean; errorMsg?: string } => {
    switch (currentStep) {
      case 1:
        if (!age || age < 18 || age > 65) return { isValid: false, errorMsg: '请点击选择或确认主申请人真实年龄 (18~55岁)' };
        if (!maritalStatus) return { isValid: false, errorMsg: '请选择婚姻与家庭随行状况' };
        if (!domesticCityTier) return { isValid: false, errorMsg: '请选择目前国内常住所在城市层级' };
        if (!departureMotivations || departureMotivations.length === 0) {
          return { isValid: false, errorMsg: '请至少选择 1 项核心出国驱动力 / 痛点' };
        }
        return { isValid: true };
      case 2:
        if (!educationLevel) return { isValid: false, errorMsg: '请选择意向出海攻读/申请的最高学历路径' };
        if (!fieldCategory) return { isValid: false, errorMsg: '请选择您的专业类别赛道' };
        if (!specificJobOrMajor || specificJobOrMajor.trim().length === 0) {
          return { isValid: false, errorMsg: '请填写或确认具体专业/岗位细分' };
        }
        return { isValid: true };
      case 3:
        if (experienceYears === undefined || experienceYears === null || experienceYears < 0) {
          return { isValid: false, errorMsg: '请选择相关全职工作经验年限' };
        }
        if (!certificationStatus) return { isValid: false, errorMsg: '请选择专业资质与行会执照认证状态' };
        return { isValid: true };
      case 4:
        if (!englishBand) return { isValid: false, errorMsg: '请选择主申请人当前的英语水平' };
        if (!secondLanguageIntent) return { isValid: false, errorMsg: '请选择二外学习意愿与欧陆适应倾向' };
        return { isValid: true };
      case 5:
        if (!budgetTier) return { isValid: false, errorMsg: '请选择家庭总可支配出海预算' };
        if (!pathwayPreference) return { isValid: false, errorMsg: '请选择偏好的出海路径类型' };
        return { isValid: true };
      case 6:
        if (!corePriority) return { isValid: false, errorMsg: '请选择您的第一核心诉求优先级' };
        return { isValid: true };
      default:
        return { isValid: true };
    }
  };

  const handleNextStep = () => {
    const val = getStepValidation();
    if (!val.isValid) {
      setStepValidationError(val.errorMsg || '请完成当前步骤必填项后继续');
      return;
    }
    setStepValidationError(null);
    setCurrentStep((s) => (s + 1) as any);
  };

  const handleTriggerCalculate = () => {
    const val = getStepValidation();
    if (!val.isValid) {
      setStepValidationError(val.errorMsg || '请选择核心诉求优先级后生成结果');
      return;
    }
    setStepValidationError(null);
    handleCalculateMatch();
  };

  // Quick Preset Personas Loader
  const loadPresetProfile = (presetKey: string) => {
    setStepValidationError(null);
    if (presetKey === 'it_master') {
      setAge(28);
      setMaritalStatus('single');
      setDomesticCityTier('tier1_megacity');
      setDepartureMotivations(['workplace_burnout_35age', 'salary_purchasing_power_roi']);
      setEducationLevel('master');
      setFieldCategory('it_ai');
      setSpecificJobOrMajor('软件研发 / 全栈架构');
      setTechStackFocus('fullstack_backend');
      setExperienceYears(3);
      setCertificationStatus('in_progress');
      setEnglishBand('proficient');
      setSecondLanguageIntent('willing_to_learn_b1');
      setLonelinessTolerance('can_tolerate_solitude');
      setBudgetTier('medium_30_50');
      setPathwayPreference('study_psw');
      setCorePriority('fastest_pr');
    } else if (presetKey === 'nurse_bachelor') {
      setAge(26);
      setMaritalStatus('single');
      setDomesticCityTier('new_tier1');
      setDepartureMotivations(['workplace_burnout_35age', 'global_asset_mobility']);
      setEducationLevel('bachelor');
      setFieldCategory('healthcare');
      setSpecificJobOrMajor('注册护士 (RN) / 临床护理');
      setMedicalLicenseStatus('has_domestic_nurse_license');
      setExperienceYears(3);
      setCertificationStatus('certified_trade_or_license');
      setEnglishBand('superior');
      setSecondLanguageIntent('strict_english_only');
      setLonelinessTolerance('can_tolerate_solitude');
      setBudgetTier('low_10_25');
      setPathwayPreference('study_psw');
      setCorePriority('fastest_pr');
    } else if (presetKey === 'engineering_master') {
      setAge(29);
      setMaritalStatus('married_partner_none');
      setDomesticCityTier('tier2_tier3');
      setDepartureMotivations(['child_education_anti_involution', 'environment_food_rule_of_law']);
      setEducationLevel('master');
      setFieldCategory('engineering_renewables');
      setSpecificJobOrMajor('电气工程 / 新能源电力系统');
      setExperienceYears(5);
      setCertificationStatus('in_progress');
      setEnglishBand('proficient');
      setSecondLanguageIntent('willing_to_learn_b1');
      setLonelinessTolerance('can_tolerate_solitude');
      setBudgetTier('medium_30_50');
      setPathwayPreference('study_psw');
      setCorePriority('child_education_livable');
    } else if (presetKey === 'business_cross') {
      setAge(25);
      setMaritalStatus('single');
      setDomesticCityTier('tier1_megacity');
      setDepartureMotivations(['salary_purchasing_power_roi', 'global_asset_mobility']);
      setEducationLevel('master');
      setFieldCategory('business_finance');
      setSpecificJobOrMajor('金融分析 / 数据商业分析 (BA)');
      setBusinessCareerStrategy('cross_degree_stem_transition');
      setExperienceYears(1);
      setCertificationStatus('none');
      setEnglishBand('superior');
      setSecondLanguageIntent('willing_to_learn_b1');
      setLonelinessTolerance('can_tolerate_solitude');
      setBudgetTier('high_50_plus');
      setPathwayPreference('study_psw');
      setCorePriority('high_roi_salary');
    }
  };

  const handleCalculateMatch = () => {
    const list: GlobalTierMatchItem[] = [];
    const userAge = age || 28;
    const isMasterOrAbove = educationLevel === 'master' || educationLevel === 'doctorate';
    const isDoctorate = educationLevel === 'doctorate';
    const hasTradesSkill = fieldCategory === 'trades_skilled';
    const hasHealthCare = fieldCategory === 'healthcare';
    const hasTeaching = fieldCategory === 'teaching';
    const hasTechEng = fieldCategory === 'it_ai' || fieldCategory === 'engineering_renewables';
    const isStrictEnglishOnly = secondLanguageIntent === 'strict_english_only';
    const wantsSafePR = corePriority === 'fastest_pr';
    const wantsHighSalary = corePriority === 'high_roi_salary';
    const wantsFamily = corePriority === 'child_education_livable';

    // ----------------------------------------------------
    // 1. 新西兰 (NZ)
    // ----------------------------------------------------
    let nzScore = wantsSafePR || wantsFamily ? 92 : 84;
    let nzTier: 'tier1' | 'tier2' | 'tier3' = 'tier1';
    let nzVisa = 'SMC 6分制技术移民居留签证';
    let nzWhy = '';

    if (isDoctorate) {
      nzScore = 98;
      nzTier = 'tier1';
      nzVisa = '博士直通 SMC 6分制 (直接积满6分)';
      nzWhy = '新西兰认可博士学位 (Level 10) 直接获得 6 分及格线，无需工作经验加分即可直接递交 PR 永久居留！';
    } else if (hasHealthCare) {
      nzScore = 96;
      nzTier = 'tier1';
      nzVisa = '绿名单 Tier 1 直接居留 (STR)';
      nzWhy = '注册护士与助产士位列绿名单一阶段直通，持有认证雇主 Job Offer 即可在境外或境内直接递交 PR 绿卡！';
    } else if (hasTradesSkill) {
      nzScore = 94;
      nzTier = 'tier1';
      nzVisa = '绿名单 Tier 2 工作转居留 (WTR)';
      nzWhy = '汽修、电工、木工等紧缺工种无需高学历，在新西兰本地技能工作满 24 个月直接批永久回头签。';
    } else if (hasTeaching) {
      nzScore = 91;
      nzTier = 'tier1';
      nzVisa = '注册教师 SMC 6分制 (GD 1年)';
      nzWhy = '完成 1 年 GD 教师文凭即可获注册资格，属于政府绝对紧缺扶持行业，毕业即获雇主聘书与 PR。';
    } else if (hasTechEng) {
      if (isMasterOrAbove) {
        nzScore = 93;
        nzTier = 'tier1';
        nzWhy = '攻读 1.5 年硕士（或 1年 GD 专升硕）直接斩获 5 分主技能分，配合 1 年新西兰全职技能工作（时薪 NZD $35.00+）即满 6 分锁定全球独有永久回头签！';
      } else {
        nzScore = 84;
        nzTier = 'tier1';
        nzWhy = '本科学历获 3 分，配合 3 年本地中位数技能工作经验积满 6 分。';
      }
    } else {
      if (businessCareerStrategy === 'cross_degree_stem_transition') {
        nzScore = 86;
        nzTier = 'tier1';
        nzWhy = '通过转读 1.5 年计算机/幼教硕士或 1 年 GD 跨界衔接，毕业享 3 年全职工签，避开文商科内卷。';
      } else {
        nzScore = 60;
        nzTier = 'tier2';
        nzWhy = '文商科无法享受紧缺清单，初级岗位难以达标法定中位数时薪 (NZD $35.00/hr)，需做好 1.5 倍高薪的准备。';
      }
    }

    const nzCurated: CuratedPathwayTier[] = [
      {
        pathwayName: '1.5年 绿色清单 Master of IT / 计算机硕士',
        representativeSchools: ['奥克兰大学 (UoA)', '坎特伯雷大学 (UC)', '怀卡托大学 (UOW)'],
        duration: '1.5 年 (3个学期)',
        estimatedTuition: 'NZD $42,000 / 年',
        highlights: '毕业即获 5分主技能分 + 3年全职开放工签 (PSW)，配偶享全职陪读工签，子女免费入读公立中小学。',
      },
      {
        pathwayName: '1年 Graduate Diploma (GD 专升硕/跨专业文凭)',
        representativeSchools: ['怀卡托理工 (Wintec)', '奥塔哥理工 (Otago Poly)', 'Unitec 理工'],
        duration: '1 年 (专科可直申)',
        estimatedTuition: 'NZD $24,000 / 年',
        highlights: '专科背景低成本首选，1 年快速毕业衔接 5分硕士或直接进入本地实操技能就业。',
      },
    ];

    list.push({
      countryCode: 'NZ',
      countryName: '新西兰',
      flag: '🇳🇿',
      tier: nzTier,
      tierLabel: nzTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : '🟡 稳妥过渡 (Tier 2)',
      matchScore: nzScore,
      primaryVisa: nzVisa,
      visaSlug: 'nz_smc',
      estimatedTimeline: hasHealthCare ? '境外直递 · 6-9月获批' : isMasterOrAbove ? '工作 1 年满 6分直批 PR' : '工作 2-3 年转 PR',
      statutoryWage: '时薪中位数 NZD $35.00/hr',
      whyMatched: nzWhy,
      fatalBottlenecks: [
        '本地工商业体量小，IT/文商初级岗位池极浅，离岸盲投几乎零响应。',
        '时薪中位数上涨至 NZD $35.00/hr (年薪 $7.28w+)，部分中小雇主难以提供合规时薪 Offer。',
        '奥克兰租金与生活物价高企，前期求职期需自备 6 个月储备金。',
      ],
      officialDocUrl: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/skilled-migrant-category-resident-visa',
      curatedPathways: nzCurated,
      timeline3YearPlan: {
        year1: '抵达新西兰入读 1.5 年授课硕士 / 1 年 GD 文凭，配偶享全职开放工签，子女免费入读公立中小学。',
        year2: '毕业申请 3 年全职无限制开放工签 (PSW)，入职新西兰认证雇主 (AEWV) 并签订全职聘书。',
        year3: '全职工作满 12 个月（时薪达 NZD $35.00+），在线递交 SMC 6分制居留申请，获批全球独有永久回头签 (IRV)。',
      },
    });

    // ----------------------------------------------------
    // 2. 澳大利亚 (AU) - 重点支持蓝领技工 (TRA)
    // ----------------------------------------------------
    let auScore = 65;
    let auTier: 'tier1' | 'tier2' | 'tier3' = 'tier2';
    let auWhy = '';
    let auVisa = '189 / 190 独立技术移民签证';
    let auDocUrl = 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189';

    const auCurated: CuratedPathwayTier[] = [];

    if (hasTradesSkill) {
      auScore = 95;
      auTier = 'tier1';
      auVisa = '澳洲 TAFE 技工留学 ➔ TRA 技能评估 / JRP ➔ 190/491 州担保永居';
      auDocUrl = 'https://www.tradesrecognitionaustralia.gov.au';
      auWhy = '蓝领技工（木工、汽修、电工、西厨）位列澳洲各州担保与雇主担保最高优先级！通过 2 年 TAFE 学习 + TRA 职业评估 (JRP)，低成本极速突围，免除 85 分卷分烦恼。';
      auCurated.push({
        pathwayName: '2年 TAFE 职业技工课程 (木工/汽修/电工/西厨)',
        representativeSchools: ['TAFE NSW (新南威尔士)', 'TAFE Queensland (昆士兰)', 'Holmesglen Institute (维州)'],
        duration: '2 年 (含 360 小时带薪实操实习)',
        estimatedTuition: 'AUD $14,000 ~ $18,000 / 年',
        highlights: '学费仅为本科一半，毕业直接参加 Job Ready Program (JRP) 完成 TRA 职业评估，锁定 190/491 州担保 PR。',
      });
    } else if (hasHealthCare && highScoreWillingness) {
      auScore = 95;
      auTier = 'tier1';
      auVisa = '189 / 190 医护优先轮次';
      auWhy = '医护与教育享有联邦绝对最高优先级，只要英语达标（雅思4个7 / OET 4个B），65分裸分稳定批下 189/190 PR 绿卡！';
      auCurated.push({
        pathwayName: '2年 护理硕士 / GD 注册护士衔接课程',
        representativeSchools: ['悉尼大学', '莫纳什大学', '迪肯大学 (Deakin)'],
        duration: '2 年',
        estimatedTuition: 'AUD $38,000 / 年',
        highlights: '完成 CRICOS 注册课程即可通过 ANMAC 职业评估，65分裸分直接递交 EOI 获邀。',
      });
    } else if (hasTechEng) {
      if (userAge > 35) {
        auScore = 38;
        auTier = 'tier3';
        auWhy = '澳洲 2026 新政已将 485 毕业工签年龄上限严卡至 35 岁，大龄读硕无法拿工签；且 IT 独立技术打分卷至 85-95 分。';
      } else if (englishBand === 'superior') {
        auScore = 78;
        auTier = 'tier2';
        auWhy = '年轻且持有 PTE 79+（八炸20分）加分，可通过 190 州担保或偏远地区 491 政策寻找破局窗口。';
      } else {
        auScore = 50;
        auTier = 'tier3';
        auWhy = 'IT 裸分受限严重，若无 PTE 八炸与偏远地区加分，获邀概率极低。';
      }
    } else {
      auScore = 20;
      auTier = 'tier3';
      auWhy = '会计与金融在澳洲 EOI 邀请分数已高达 95-100 分天花板，且 485 工签收紧，极易陷入毕业即送中的沉没陷阱。';
    }

    list.push({
      countryCode: 'AU',
      countryName: '澳大利亚',
      flag: '🇦🇺',
      tier: auTier,
      tierLabel: auTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : auTier === 'tier2' ? '🟡 稳妥过渡 (Tier 2)' : '🔴 风险劝退 (Tier 3)',
      matchScore: auScore,
      primaryVisa: auVisa,
      visaSlug: 'au_189',
      estimatedTimeline: hasTradesSkill ? 'TAFE 2年 + JRP 1年 ➔ 直批 PR' : hasHealthCare ? '65分基准秒批 PR' : '需 1-2 年州担择优抽选',
      statutoryWage: 'TSMIT AUD $73,150/年',
      whyMatched: auWhy,
      fatalBottlenecks: [
        '485 毕业工签年龄上限已严卡至 35 岁，大龄读硕无法享受工签缓冲期。',
        'IT / 会计 / 金融等通用专业 EOI 独立技术卷至 85~95 分天花板，单身或无八炸极难获邀。',
        '偏远地区 491 签证有 3 年居住与税务考核要求，转 PR 周期拉长。',
      ],
      officialDocUrl: auDocUrl,
      curatedPathways: auCurated,
      timeline3YearPlan: {
        year1: '赴澳入读 2 年 CRICOS 注册课程 / TAFE 技工专科，完成前置实操学分。',
        year2: '毕业考取 PTE 语言加分，启动 TRA JRP 实操评估或向州政府递交 190/491 ROI。',
        year3: '获得州政府 Nomination 获邀信，递交 190 签证申请，正式获批澳洲永居 PR。',
      },
    });

    // ----------------------------------------------------
    // 3. 德国 (DE) - 硬过滤与客观风险细化
    // ----------------------------------------------------
    let deScore = 75;
    let deTier: 'tier1' | 'tier2' | 'tier3' = 'tier2';
    let deWhy = '';

    if (isStrictEnglishOnly) {
      // 触发硬过滤惩罚：扣减 80 分强制降入 Tier 3
      deScore = 15;
      deTier = 'tier3';
      deWhy = '⚠️ 触发语言硬过滤：因您明确选择“坚决不学二外”，德国转永居法案严格要求德语 B1 证书，且纯英语初级岗位竞争激烈，已被系统自动归入风险劝退梯队。';
    } else if (secondLanguage === 'de' || secondLanguageIntent === 'has_intermediate_foundation') {
      deScore = hasTechEng || hasTradesSkill ? 96 : 89;
      deTier = 'tier1';
      deWhy = '具备德语基础将享受欧洲最大工业红利！紧缺蓝卡年薪降至 €41,041，公立大学免学费，德语 B1 仅需 21 个月交税直接转德国永居。';
    } else {
      // 愿意自学至 B1
      deScore = hasTechEng ? 82 : 62;
      deTier = deScore >= 80 ? 'tier1' : 'tier2';
      deWhy = '公立免学费性价比极高，但需做好 1-2 年内自学德语至 B1 的充分准备，同时理工科公立大学“严进严出”，学业实际周期可能长达 2.5~3 年。';
    }

    const deCurated: CuratedPathwayTier[] = [
      {
        pathwayName: '2年 英文授课 Engineering / CS 硕士 (公立免学费)',
        representativeSchools: ['亚琛工业大学 (RWTH Aachen)', '慕尼黑工业大学 (TUM)', '达姆施塔特应用科技大学 (h_da)'],
        duration: '2 ~ 2.5 年',
        estimatedTuition: '€0 (免学费，仅每学期 €350 注册费)',
        highlights: '欧洲顶尖工业底盘，毕业享 18 个月找工作签，入职紧缺行业 (€41,041/年) 满 21 个月直接换德国永居。',
      },
    ];

    list.push({
      countryCode: 'DE',
      countryName: '德国',
      flag: '🇩🇪',
      tier: deTier,
      tierLabel: deTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : deTier === 'tier2' ? '🟡 稳妥过渡 (Tier 2)' : '🔴 风险劝退 (Tier 3)',
      matchScore: deScore,
      primaryVisa: '欧盟蓝卡 (EU Blue Card) / 机会卡',
      visaSlug: 'de_blue_card',
      estimatedTimeline: '21 个月交税极速换永居',
      statutoryWage: '紧缺行业法定年薪 €41,041',
      whyMatched: deWhy,
      fatalBottlenecks: [
        '【语言壁垒】德国法律规定蓝卡转永居必须通过德语 B1 考试，纯英语初级岗位高度集中在少数初创企业，竞争激烈。',
        '【学业难度】公立大学“严进严出”，考核严苛，部分工科硕士实际毕业周期常拉长至 2.5 ~ 3 年。',
        '【社交融入与行政】欧陆华人社群较小，社交孤独感较强；外管局 (Ausländerbehörde) 预约周期漫长官僚化严重。',
      ],
      officialDocUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card',
      curatedPathways: deCurated,
      timeline3YearPlan: {
        year1: '入读德国公立免学费硕士，在校期间系统自学德语至 B1 级。',
        year2: '毕业获得 18 个月找工作签，签订 €41,041+ 紧缺合同获发欧盟蓝卡。',
        year3: '在德缴纳法定社保满 21 个月，提交德语 B1 证书直接换发永久居留 (Niederlassungserlaubnis)。',
      },
    });

    // ----------------------------------------------------
    // 4. 爱尔兰 (IE)
    // ----------------------------------------------------
    let ieScore = (hasTechEng || hasHealthCare) ? 91 : 76;
    let ieTier: 'tier1' | 'tier2' | 'tier3' = ieScore >= 85 ? 'tier1' : 'tier2';

    const ieCurated: CuratedPathwayTier[] = [
      {
        pathwayName: '1年 计算机 / 医药生物数据授课型硕士 (MSc)',
        representativeSchools: ['都柏林大学 (UCD)', '都柏林圣三一 (TCD)', '高威大学 (University of Galway)'],
        duration: '1 年 (紧凑高效)',
        estimatedTuition: '€18,000 ~ €24,000 / 年',
        highlights: '欧盟唯一纯英语母语国，毕业直享 2 年 Stay Back 找工签，入职 €38k 紧缺岗 2 年直接换 Stamp 4 绿卡。',
      },
    ];

    list.push({
      countryCode: 'IE',
      countryName: '爱尔兰',
      flag: '🇮🇪',
      tier: ieTier,
      tierLabel: ieTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : '🟡 稳妥过渡 (Tier 2)',
      matchScore: ieScore,
      primaryVisa: 'Critical Skills Employment Permit (CSEP)',
      visaSlug: 'ie_csep',
      estimatedTimeline: '工作满 2 年直接换 Stamp 4 绿卡',
      statutoryWage: '法定年薪 €38,000+',
      whyMatched: '欧盟唯一纯英语母语国，欧洲硅谷与跨国医药枢纽，紧缺工签免做劳动力市场测试，2年直接换永久居留。',
      fatalBottlenecks: [
        '都柏林 (Dublin) 遭遇史上最严峻房荒危机，租金奇高且单间床位极度紧缺。',
        '关键技能清单严格限定年薪门槛 (€38,000+ 起)，普通初级应届毕业生起薪难以达标。',
        '公共医疗与幼托托儿所排队周期较长。',
      ],
      officialDocUrl: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/critical-skills-employment-permit/',
      curatedPathways: ieCurated,
      timeline3YearPlan: {
        year1: '获得爱尔兰高科技或医疗企业聘书，直接下发 CSEP 关键技能工作许可。',
        year2: '工作满 21 个月，配偶合法工作无限制。',
        year3: '工作满 24 个月直接免除雇主绑定，换发 Stamp 4 永久居留卡，满 5 年可申请爱尔兰护照（英欧双通）。',
      },
    });

    // ----------------------------------------------------
    // 5. 加拿大 (CA)
    // ----------------------------------------------------
    let caScore = 72;
    let caTier: 'tier1' | 'tier2' | 'tier3' = 'tier2';
    let caWhy = '';

    if (secondLanguage === 'fr' || secondLanguageIntent === 'has_intermediate_foundation') {
      caScore = 94;
      caTier = 'tier1';
      caWhy = '持有法语 NCLC 7（B2）属于加拿大联邦绝对保送类别，Express Entry 定向抽选 380-420 低分秒邀枫叶卡！';
    } else if (hasHealthCare || hasTradesSkill) {
      caScore = 88;
      caTier = 'tier1';
      caWhy = '医疗健康与技工类别享受 Express Entry 专项定向邀请，获邀分数远低于通用池。';
    } else if (hasTechEng && isMasterOrAbove) {
      caScore = 76;
      caTier = 'tier2';
      caWhy = '硕士毕业全量享 3 年 PGWP 毕业工签，可通过 STEM 定向抽选或安省/BC省提名 PNP 寻找破局。';
    } else {
      caScore = 58;
      caTier = 'tier2';
      caWhy = '通用 CRS 池分数已突破 520+ 高位，需强拼法语双语或争取省提名 600 分加分。';
    }

    const caCurated: CuratedPathwayTier[] = [
      {
        pathwayName: '1.5~2年 公立大学计算机/工程硕士 / 2年学院大专',
        representativeSchools: ['滑铁卢大学 (Waterloo)', '多伦多大学', '乔治布朗学院 (George Brown)'],
        duration: '2 年',
        estimatedTuition: 'CAD $22,000 ~ $38,000 / 年',
        highlights: '全量享有 3 年 PGWP 开放毕业工签，积累 1 年本地经验后通过 STEM / 技工定向抽选拿枫叶卡。',
      },
    ];

    list.push({
      countryCode: 'CA',
      countryName: '加拿大',
      flag: '🇨🇦',
      tier: caTier,
      tierLabel: caTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : '🟡 稳妥过渡 (Tier 2)',
      matchScore: caScore,
      primaryVisa: 'Express Entry (定向抽选) / PNP 省提名',
      visaSlug: 'ca_ee_fsw',
      estimatedTimeline: '3 年 PGWP 工签过渡转 PR',
      statutoryWage: 'NOC TEER 0/1/2 技能',
      whyMatched: caWhy,
      fatalBottlenecks: [
        'Express Entry 通用 CRS 分数居高不下 (520+ 分)，非法语或非专项定向难以获邀。',
        '各省 PNP 省提名配额缩减，留学生毕业工签 (PGWP) 政策收紧。',
        '温哥华、多伦多生活成本与房价高企，医疗公费系统家庭医生紧缺。',
      ],
      officialDocUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
      curatedPathways: caCurated,
      timeline3YearPlan: {
        year1: '入读 2 年加拿大公立大学或 1.5 年授课硕士，累积本地教育背景与人脉。',
        year2: '毕业获得 3 年 PGWP 开放工签，入职合规岗位积累 1 年加拿大本地全职经验。',
        year3: '进入 Express Entry STEM / 医疗 / 法语定向抽选轮次，获批枫叶卡 (PR)。',
      },
    });

    // ----------------------------------------------------
    // 6. 日本 (JP)
    // ----------------------------------------------------
    let jpScore = 75;
    let jpTier: 'tier1' | 'tier2' | 'tier3' = 'tier2';
    let jpWhy = '';

    if (isStrictEnglishOnly) {
      jpScore = 40;
      jpTier = 'tier3';
      jpWhy = '⚠️ 坚决不学二外将极大受限于日本本地职场与日常生活，非外企 IT 岗位几乎无法开展。';
    } else {
      jpScore = isMasterOrAbove ? 92 : 85;
      jpTier = 'tier1';
      jpWhy = '愿学日语或懂技术背景，日本高度人才积分制对本硕学历与年薪给予丰厚加分，达到 80 分仅需在日工作 1 年直接申永住！';
    }

    const jpCurated: CuratedPathwayTier[] = [
      {
        pathwayName: '2年 英文授课 SGU 修士 / 专门学校技工课程',
        representativeSchools: ['东京大学 (UTokyo)', '早稻田大学 (Waseda)', '东京工业大学 (Tokyo Tech)'],
        duration: '2 年',
        estimatedTuition: '¥80万 ~ ¥120万 日元 / 年 (学费极低)',
        highlights: '名校修士学历加 20分，高度人才打分达 80 分仅需在日纳税 1 年直接获得日本永住权。',
      },
    ];

    list.push({
      countryCode: 'JP',
      countryName: '日本',
      flag: '🇯🇵',
      tier: jpTier,
      tierLabel: jpTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : '🟡 稳妥过渡 (Tier 2)',
      matchScore: jpScore,
      primaryVisa: '高度专门职 1号 (IT/商贸高才) → 永住',
      visaSlug: 'nz_smc',
      estimatedTimeline: '80分仅需 1 年速通申请永住',
      statutoryWage: '年薪 ¥400万+ 起',
      whyMatched: jpWhy,
      fatalBottlenecks: [
        '日元汇率处于历史低位，折算人民币或美元薪资购买力有所折损。',
        '传统日企存在年功序列与加班文化，高度人才需跨过文化与日语 N1 沟通壁垒。',
        '永住申请审查周期拉长至 12~18 个月。',
      ],
      officialDocUrl: 'https://www.moj.go.jp/isa',
      curatedPathways: jpCurated,
      timeline3YearPlan: {
        year1: '凭借名校学历与技术背景直接对接在日企业（IT/跨境电商），核算高度人才打分达 80 分获批高才签。',
        year2: '在日全职工作满 12 个月，保持年薪纳税记录合规。',
        year3: '直接递交日本永久居留许可（永住）申请，配偶自由全职工作，父母享探亲长期签证。',
      },
    });

    // ----------------------------------------------------
    // 7. 法国 (FR)
    // ----------------------------------------------------
    let frScore = 70;
    let frTier: 'tier1' | 'tier2' | 'tier3' = 'tier2';
    let frWhy = '';

    if (isStrictEnglishOnly) {
      frScore = 12;
      frTier = 'tier3';
      frWhy = '⚠️ 触发语言硬过滤：法国职场与日常生活极度依赖法语，坚决不学二外无法在法求职或转身份。';
    } else if (secondLanguage === 'fr' || secondLanguageIntent === 'has_intermediate_foundation') {
      frScore = 86;
      frTier = 'tier1';
      frWhy = '公立大学免学费性价比极高，法国硕士毕业工作满 2 年享有快速入籍特批法案通道。';
    } else {
      frScore = 60;
      frTier = 'tier2';
      frWhy = '免学费优势明显，但需在 1-2 年内突破法语 B2 门槛方可顺利转为人才护照。';
    }

    const frCurated: CuratedPathwayTier[] = [
      {
        pathwayName: '2年 公立大学免学费理学/工程师硕士',
        representativeSchools: ['巴黎综合理工 (IP Paris)', '索邦大学 (Sorbonne)', '巴黎萨克雷大学 (Saclay)'],
        duration: '2 年',
        estimatedTuition: '€0 (免学费，仅每年 €243 注册费)',
        highlights: '毕业获 1 年 APS 找工签，入职获批 4 年人才护照，工作满 2 年可依民法典申请入籍。',
      },
    ];

    list.push({
      countryCode: 'FR',
      countryName: '法国',
      flag: '🇫🇷',
      tier: frTier,
      tierLabel: frTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : frTier === 'tier2' ? '🟡 稳妥过渡 (Tier 2)' : '🔴 风险劝退 (Tier 3)',
      matchScore: frScore,
      primaryVisa: 'Passeport Talent (人才护照)',
      visaSlug: 'fr_talent_passport',
      estimatedTimeline: '硕士毕业工作 2 年可申请入籍',
      statutoryWage: '人才护照年薪 €43,000',
      whyMatched: frWhy,
      fatalBottlenecks: [
        '职场与日常生活极度依赖法语 (至少 B2~C1 级别)，纯英语环境工作机会极其有限。',
        '法国行政办事效率与罢工频率较高，居留卡 (Titre de séjour) 续签周期长。',
        '高累进税率与法定社保扣除比例较高。',
      ],
      officialDocUrl: 'https://www.service-public.fr/particuliers/vosdroits/F16922',
      curatedPathways: frCurated,
      timeline3YearPlan: {
        year1: '赴法攻读 2 年公立大学或高商硕士学位，法语达到 B2 水平。',
        year2: '毕业申请 1 年 APS 找工作签，签订 €43k+ 劳动合同获批 4 年人才护照。',
        year3: '工作满 2 年凭借卓越高等教育背景依据民法典直接递交入籍归化申请。',
      },
    });

    // ----------------------------------------------------
    // 8. 荷兰 (NL)
    // ----------------------------------------------------
    let nlScore = hasTechEng ? 84 : 70;
    let nlTier: 'tier1' | 'tier2' | 'tier3' = nlScore >= 80 ? 'tier1' : 'tier2';

    const nlCurated: CuratedPathwayTier[] = [
      {
        pathwayName: '1年 Orientation Year (Zoekjaar) 找工签 ➔ 高技术移民',
        representativeSchools: ['代尔夫特理工 (TU Delft)', '阿姆斯特丹大学 (UvA)', '埃因霍温理工 (TU/e)'],
        duration: '1 ~ 2 年',
        estimatedTuition: '€16,000 ~ €20,000 / 年',
        highlights: '欧洲英语普及率第一，全球 Top 200 本硕直享 1 年找工签，ASML/Booking 等巨头云集。',
      },
    ];

    list.push({
      countryCode: 'NL',
      countryName: '荷兰',
      flag: '🇳🇱',
      tier: nlTier,
      tierLabel: nlTier === 'tier1' ? '🟢 极力推荐 (Tier 1)' : '🟡 稳妥过渡 (Tier 2)',
      matchScore: nlScore,
      primaryVisa: 'Orientation Year ➔ Kennismigrant',
      visaSlug: 'nl_kennismigrant',
      estimatedTimeline: '5 年高技术移民转永居',
      statutoryWage: '30岁以下月薪 €3,909',
      whyMatched: '欧洲英语普及率最高的非英语国，全球 Top 200 本硕直享 1 年找工签，高技术移民通道顺畅。',
      fatalBottlenecks: [
        '30% 裁定 (30% Ruling) 税务减免优惠政策缩水，高技术移民净到手薪资受影响。',
        '阿姆斯特丹、鹿特丹等核心区住房极其紧张，租房需竞价且供不应求。',
        '永居与入籍需通过荷兰语市民融入考试 (Inburgering)。',
      ],
      officialDocUrl: 'https://ind.nl/en/residence-permits/work/highly-skilled-migrant',
      curatedPathways: nlCurated,
      timeline3YearPlan: {
        year1: '凭借全球前 200 名校毕业身份申请 1 年 Orientation Year (Zoekjaar) 找工签证入境。',
        year2: '入职荷兰认可资质雇主 (Recognized Sponsor)，转换 Kennismigrant 高技术移民居留。',
        year3: '稳定在荷兰全职纳税满 5 年，通过荷兰语 A2/B1 融入考，申请荷兰永居或欧盟长居。',
      },
    });

    // ----------------------------------------------------
    // 9. 瑞典 (SE)
    // ----------------------------------------------------
    let seScore = hasTechEng ? 73 : 58;

    list.push({
      countryCode: 'SE',
      countryName: '瑞典',
      flag: '🇸🇪',
      tier: 'tier2',
      tierLabel: '🟡 稳妥过渡 (Tier 2)',
      matchScore: seScore,
      primaryVisa: 'Arbetstillstånd (工作许可) → 永居',
      visaSlug: 'se_work_permit',
      estimatedTimeline: '工签工作满 4 年转永居',
      statutoryWage: '月薪 SEK 28,480+',
      whyMatched: '北欧创新中心，科技企业英语普及度高，全家享免费优质公立教育与高社会福利。',
      fatalBottlenecks: [
        '新政将工签最低薪资上调至瑞典中位数 80% (SEK 28,480+/月)，初级工种受限。',
        '入籍与永居正筹备引入瑞典语和公民常识考试，移民政策整体右翼收紧。',
        '斯德哥尔摩公立租房排队周期长达数年，冬季日照极短气候寒冷。',
      ],
      officialDocUrl: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden.html',
      timeline3YearPlan: {
        year1: '获得瑞典企业聘书，向移民局递交工签申请并获批首期 2 年工签。',
        year2: '工作满 2 年申请延期 2 年，配偶合法工作。',
        year3: '工签累计满 48 个月后直接申请瑞典永久居留 (PUT)。',
      },
    });

    // ----------------------------------------------------
    // 10. 丹麦 (DK)
    // ----------------------------------------------------
    list.push({
      countryCode: 'DK',
      countryName: '丹麦',
      flag: '🇩🇰',
      tier: 'tier2',
      tierLabel: '🟡 稳妥过渡 (Tier 2)',
      matchScore: 68,
      primaryVisa: 'Pay Limit Scheme / Positive List',
      visaSlug: 'dk_pay_limit',
      estimatedTimeline: '4-8 年转永居',
      statutoryWage: '标准年薪 DKK 375,000+',
      whyMatched: '紧缺清单职业免配额直接发工签，童话王国极佳的社会治安与工作生活平衡。',
      fatalBottlenecks: [
        '紧缺工签 Pay Limit Scheme 薪资门槛高达 DKK 375,000+ / 年，初级岗位极难达成。',
        '永久居留要求极为苛刻：需通过丹麦语 2 级、工作满 3.5 年、无违法且通过公民测试。',
        '全欧最高边际所得税率之一。',
      ],
      officialDocUrl: 'https://www.nyidanmark.dk/en-GB/Applying/Work/Pay%20limit%20scheme',
      timeline3YearPlan: {
        year1: '获得丹麦高薪聘书申请 Pay Limit 签证入境。',
        year2: '全职工作并同步在业余时间修读丹麦语课程。',
        year3: '持续在丹麦工作缴税，累积满法定工作年限申请永居。',
      },
    });

    // ----------------------------------------------------
    // 11. 芬兰 (FI)
    // ----------------------------------------------------
    let fiScore = isStrictEnglishOnly ? 15 : 66;
    let fiTier: 'tier1' | 'tier2' | 'tier3' = fiScore < 30 ? 'tier3' : 'tier2';

    list.push({
      countryCode: 'FI',
      countryName: '芬兰',
      flag: '🇫🇮',
      tier: fiTier,
      tierLabel: fiTier === 'tier3' ? '🔴 风险劝退 (Tier 3)' : '🟡 稳妥过渡 (Tier 2)',
      matchScore: fiScore,
      primaryVisa: 'Specialist Visa (专家签)',
      visaSlug: 'fi_specialist',
      estimatedTimeline: '4 年连续工作转永居',
      statutoryWage: '月薪 €3,000+',
      whyMatched: isStrictEnglishOnly
        ? '⚠️ 芬兰语属于极高难度语言体系，非纯英语母语国，不学语言融入难度极高。'
        : '全球幸福指数连续第一，留学生毕业享 2 年找工作签，专家通道两周极速下签。',
      fatalBottlenecks: [
        '芬兰语属于极高难度语言体系，本地非 IT 行业招聘极其看重芬兰语流利度。',
        '经济增长承压，失业工签宽限期收紧（失业 3 个月必须找到新雇主）。',
        '高纬度冬季漫长，社交融入难度相对较高。',
      ],
      officialDocUrl: 'https://migri.fi/en/specialist',
      timeline3YearPlan: {
        year1: '芬兰硕士毕业申请 2 年找工作签，入职本地科技或工程企业。',
        year2: '转为 A 类连续居留许可 (Jatkolupa)。',
        year3: '持 A 类居留满 4 年且通过芬兰语/瑞典语 YKI 考试申请永久居留。',
      },
    });

    // ----------------------------------------------------
    // 12. 新加坡 (SG)
    // ----------------------------------------------------
    let sgScore = (wantsHighSalary && isMasterOrAbove) ? 68 : 35;

    list.push({
      countryCode: 'SG',
      countryName: '新加坡',
      flag: '🇸🇬',
      tier: sgScore > 60 ? 'tier2' : 'tier3',
      tierLabel: sgScore > 60 ? '🟡 稳妥过渡 (Tier 2)' : '🔴 风险劝退 (Tier 3)',
      matchScore: sgScore,
      primaryVisa: 'Employment Pass (EP) / COMPASS 40分',
      visaSlug: 'sg_compass',
      estimatedTimeline: 'PR 审批属黑盒无明确周期',
      statutoryWage: '最低月薪 S$5,600 (金融 S$6,200)',
      whyMatched: '亚洲金融与科技枢纽，零语言障碍，超低个人所得税，适合高薪肉身出海打工赚钱。',
      fatalBottlenecks: [
        'COMPASS 积分制对企业国籍多样性与高薪把控极严，EP 最低月薪门槛上调至 S$5,600 (金融 S$6,200)。',
        'PR 永久居民审批属于“黑盒机制”，无公开透明积分标准，通过率因人而异。',
        '非公民购房需缴纳 60% 额外买方印花税 (ABSD)，生活定居成本极高。',
      ],
      officialDocUrl: 'https://www.mom.gov.sg/passes-and-permits/employment-pass',
      timeline3YearPlan: {
        year1: '获得新加坡跨国企业 Offer 并通过 COMPASS 40分制审核获批 EP 工签。',
        year2: '工作满 1-2 年向 ICA 递交 PR 永久居民申请。',
        year3: '若 PR 未获批可继续续签 EP，或作为跳板转战澳新欧陆。',
      },
    });

    // ----------------------------------------------------
    // 13. 英国 (UK)
    // ----------------------------------------------------
    let ukScore = hasHealthCare ? 68 : 22;
    let ukTier: 'tier1' | 'tier2' | 'tier3' = hasHealthCare ? 'tier2' : 'tier3';

    list.push({
      countryCode: 'UK',
      countryName: '英国',
      flag: '🇬🇧',
      tier: ukTier,
      tierLabel: ukTier === 'tier2' ? '🟡 稳妥过渡 (Tier 2)' : '🔴 风险劝退 (Tier 3)',
      matchScore: ukScore,
      primaryVisa: 'Skilled Worker Visa (SWV)',
      visaSlug: 'uk_swv',
      estimatedTimeline: '5 年工作转 ILR 永居',
      statutoryWage: '法定最低门槛 £38,700',
      whyMatched: hasHealthCare
        ? '医疗照护类签证豁免 £38.7k 高薪，但已取消家属陪读。'
        : '英国工签最低薪资上调至 £38,700，初级岗位薪资严重倒挂，企业极难开具 Sponsor 担保。',
      fatalBottlenecks: [
        'Skilled Worker 签证法定最低年薪飙升至 £38,700，初级岗位 (£24k-28k) 薪资严重倒挂。',
        '照护类签证已立法彻底禁止携带家属陪读，家庭出海通道完全封死。',
        '移民健康附加费 (IHS) 与签证申请费大幅上涨，企业 Sponsor 担保意愿断崖式下跌。',
      ],
      officialDocUrl: 'https://www.gov.uk/skilled-worker-visa',
      timeline3YearPlan: {
        year1: '英国硕士毕业申请 2 年 Graduate Route 毕业生工签，寻找具备 Sponsor 资质的雇主。',
        year2: '争取达到 £38,700 最低年薪标准并获批 Skilled Worker Visa。',
        year3: '需持续在同一担保雇主下工作满 5 年方可递交 Indefinite Leave to Remain (ILR)。',
      },
    });

    // ----------------------------------------------------
    // 14. 美国 (US)
    // ----------------------------------------------------
    list.push({
      countryCode: 'US',
      countryName: '美国',
      flag: '🇺🇸',
      tier: 'tier3',
      tierLabel: '🔴 风险劝退 (Tier 3)',
      matchScore: wantsHighSalary ? 28 : 16,
      primaryVisa: 'F-1 OPT → H-1B 抽签 → EB-2/3',
      visaSlug: 'nz_smc',
      estimatedTimeline: '抽签中签率 <15% · 排期 10 年+',
      statutoryWage: '薪资虽高但身份极其脆弱',
      whyMatched: '大厂薪资虽高，但 H-1B 抽签机制带来极高不可控风险，中国大陆出生地 EB-2/3 排期长达 8-12 年，极易在工签到期时面临沉没风险。',
      fatalBottlenecks: [
        'H-1B 抽签中签率连年低于 15%，非 STEM 仅有 1 年 OPT 且仅有 1 次抽签机会。',
        '中国大陆出生地 EB-2 / EB-3 职业移民排期长达 8~12 年，身份极度脆弱。',
        '中途若遭遇裁员仅有 60 天 Grace Period 缓冲，极易被迫离境。',
      ],
      officialDocUrl: 'https://www.uscis.gov',
      timeline3YearPlan: {
        year1: '美硕毕业申请 1 年 OPT / 3 年 STEM OPT 延期，入职科技大厂。',
        year2: '连续参与每年 3 月 H-1B 抽签（当前中签率约 12-15%）。',
        year3: '若未抽中需紧急转去加拿大或欧陆海外分部，或挂靠 Day-1 CPT 维持身份。',
      },
    });

    // Sort by Match Score descending
    list.sort((a, b) => b.matchScore - a.matchScore);

    setResults(list);
    setIsCalculating(true);
  };

  const handleCalculationDone = () => {
    setIsCalculating(false);
    setCurrentStep(7);

    // Silent background auto-persistence to Cloudflare D1 (captures all guest & authenticated assessments)
    try {
      const profileSnapshot: MultiDimAssessmentProfile = {
        age: age || 28,
        maritalStatus: maritalStatus || 'single',
        educationLevel: educationLevel || 'master',
        targetDegreeLevel: educationLevel === 'vocational' ? 'vocational_trade' : educationLevel === 'bachelor' ? 'bachelor' : educationLevel === 'master' ? 'master_gd' : 'doctorate',
        fieldCategory: fieldCategory || 'it_ai',
        specificJobOrMajor: specificJobOrMajor || '通用对口方向',
        techStackFocus: techStackFocus || undefined,
        medicalLicenseStatus: medicalLicenseStatus || undefined,
        highScoreWillingness,
        tradesSubCategory: tradesSubCategory || undefined,
        businessCareerStrategy: businessCareerStrategy || undefined,
        experienceYears: experienceYears ?? 0,
        certificationStatus: certificationStatus || 'none',
        englishBand: englishBand || 'proficient',
        secondLanguage: secondLanguage || 'none',
        secondLanguageIntent: secondLanguageIntent || 'willing_to_learn_b1',
        lonelinessTolerance: lonelinessTolerance || 'can_tolerate_solitude',
        departureMotivations: departureMotivations || [],
        domesticCityTier: domesticCityTier || 'tier1_megacity',
        budgetTier: budgetTier || 'medium_30_50',
        pathwayPreference: pathwayPreference || 'study_psw',
        corePriority: corePriority || 'fastest_pr',
      };

      saveAssessmentRecord({
        title: `全球逆向选国方案 (${specificJobOrMajor || '智能测算'})`,
        profileSnapshot,
        resultSnapshot: results || [],
      }).catch((err) => {
        console.warn('Silent auto-save notice:', err);
      });
    } catch (e) {
      console.warn('Silent snapshot compilation error:', e);
    }
  };

  const handleReset = () => {
    setIsCalculating(false);
    setCurrentStep(1);
    setResults(null);
    setSaveSuccessNotice(false);
    setStepValidationError(null);
    setAge(null);
    setMaritalStatus(null);
    setDomesticCityTier(null);
    setDepartureMotivations([]);
    setEducationLevel(null);
    setFieldCategory(null);
    setSpecificJobOrMajor('');
    setTechStackFocus(null);
    setMedicalLicenseStatus(null);
    setTradesSubCategory(null);
    setBusinessCareerStrategy(null);
    setExperienceYears(null);
    setCertificationStatus(null);
    setEnglishBand(null);
    setSecondLanguage('none');
    setSecondLanguageIntent(null);
    setLonelinessTolerance(null);
    setBudgetTier(null);
    setPathwayPreference(null);
    setCorePriority(null);
  };

  const handleSaveAssessment = async () => {
    if (!results) return;

    const profileSnapshot: MultiDimAssessmentProfile = {
      age: age || 28,
      maritalStatus: maritalStatus || 'single',
      educationLevel: educationLevel || 'master',
      targetDegreeLevel: educationLevel === 'vocational' ? 'vocational_trade' : educationLevel === 'bachelor' ? 'bachelor' : educationLevel === 'master' ? 'master_gd' : 'doctorate',
      fieldCategory: fieldCategory || 'it_ai',
      specificJobOrMajor: specificJobOrMajor || '通用对口方向',
      techStackFocus: techStackFocus || undefined,
      medicalLicenseStatus: medicalLicenseStatus || undefined,
      highScoreWillingness,
      tradesSubCategory: tradesSubCategory || undefined,
      businessCareerStrategy: businessCareerStrategy || undefined,
      experienceYears: experienceYears ?? 0,
      certificationStatus: certificationStatus || 'none',
      englishBand: englishBand || 'proficient',
      secondLanguage: secondLanguage || 'none',
      secondLanguageIntent: secondLanguageIntent || 'willing_to_learn_b1',
      lonelinessTolerance: lonelinessTolerance || 'can_tolerate_solitude',
      departureMotivations: departureMotivations || [],
      domesticCityTier: domesticCityTier || 'tier1_megacity',
      budgetTier: budgetTier || 'medium_30_50',
      pathwayPreference: pathwayPreference || 'study_psw',
      corePriority: corePriority || 'fastest_pr',
    };

    if (!isAuthenticated) {
      openAuthModal('register', async () => {
        setIsSaving(true);
        await saveAssessmentRecord({
          title: `全球逆向选国方案 (${specificJobOrMajor})`,
          profileSnapshot,
          resultSnapshot: results,
        });
        setIsSaving(false);
        setSaveSuccessNotice(true);
      });
      return;
    }

    setIsSaving(true);
    await saveAssessmentRecord({
      title: `全球逆向选国方案 (${specificJobOrMajor})`,
      profileSnapshot,
      resultSnapshot: results,
    });
    setIsSaving(false);
    setSaveSuccessNotice(true);
  };

  const handleNavigateToPathway = (visaSlug: string, countryCode: CountryCode) => {
    if (onSelectCountry) onSelectCountry(countryCode);
    onClose();
    navigate(`/visas/${visaSlug}`);
  };

  if (!isOpen) return null;

  const filteredResults = results
    ? activeTierFilter === 'ALL'
      ? results
      : results.filter((r) => r.tier === activeTierFilter)
    : [];

  const profileSummaryStr = `${age ? `${age}周岁` : '年龄待定'} · ${
    educationLevel === 'vocational'
      ? '大专技工'
      : educationLevel === 'bachelor'
      ? '本科'
      : educationLevel === 'master'
      ? '硕士/GD'
      : educationLevel === 'doctorate'
      ? '博士'
      : '学历待定'
  } · ${specificJobOrMajor || '方向待定'} · ${
    englishBand === 'superior'
      ? '雅思7.5+'
      : englishBand === 'proficient'
      ? '雅思6.5+'
      : englishBand === 'competent'
      ? '雅思6.0'
      : englishBand === 'none'
      ? '基础日常 (雅思5.0以下)'
      : '语言待定'
  }`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-none">
      {/* 1. Backdrop Blur Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* 2. Drawer Canvas */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="relative w-full max-w-2xl bg-[#faf9f5] h-full shadow-2xl flex flex-col border-l border-[#e6dfd8] z-10"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#e6dfd8] flex items-center justify-between bg-[#efe9de]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c2410c] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                全球逆向智能选国决策引擎
              </h2>
              <p className="text-xs text-stone-500 font-mono mt-0.5">
                覆盖 14 国发达经济体 · 语言硬过滤与动态分支
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentStep === 7 && (
              <button
                onClick={handleReset}
                className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-[#efe9de] transition-colors text-xs flex items-center gap-1 font-mono cursor-pointer"
                title="重新调整画像"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">重新测算</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-[#efe9de] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar Indicator (Steps 1 ~ 6) */}
        {!isCalculating && currentStep < 7 && (
          <div className="px-6 pt-4 pb-2 border-b border-[#e6dfd8] bg-[#faf9f5]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
              <span>
                步骤 {currentStep} / 6:{' '}
                {currentStep === 1
                  ? '基础属性与国内现状调研'
                  : currentStep === 2
                  ? '意向攻读最高学历与专业细分'
                  : currentStep === 3
                  ? '行业经验与资质认证'
                  : currentStep === 4
                  ? '语言水平与二外学习意愿'
                  : currentStep === 5
                  ? '预算储备与落地路径'
                  : '核心诉求优先级'}
              </span>
              <span className="text-[#c2410c] font-bold">
                {Math.round((currentStep / 6) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#efe9de] overflow-hidden">
              <div
                className="h-full bg-[#c2410c] transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 select-text">
          <AnimatePresence mode="wait">
            {isCalculating && (
              <AssessmentCalculatingView
                key="calculating-view"
                onComplete={handleCalculationDone}
                durationMs={2800}
              />
            )}

            {/* ================= STEP 1: BASE ATTRIBUTES & DOMESTIC SURVEY ================= */}
            {!isCalculating && currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >

                {/* 1. Quick Preset Personas (1-Click Fill) */}
                <div className="p-4 rounded-3xl bg-[#efe9de] border border-[#e6dfd8] space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-[#c2410c] text-white">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-stone-900 font-serif">
                        快速预设画像 (1秒载入典型背景)：
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-stone-500 hidden sm:inline">免去逐项手动勾选</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => loadPresetProfile('it_master')}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 font-medium transition-all shadow-2xs cursor-pointer hover:border-[#c2410c]/60 flex items-center gap-1"
                    >
                      <span>💻 28岁 IT架构·硕士</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => loadPresetProfile('nurse_bachelor')}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 font-medium transition-all shadow-2xs cursor-pointer hover:border-[#c2410c]/60 flex items-center gap-1"
                    >
                      <span>🩺 26岁 注册护士·本科</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => loadPresetProfile('engineering_master')}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 font-medium transition-all shadow-2xs cursor-pointer hover:border-[#c2410c]/60 flex items-center gap-1"
                    >
                      <span>⚡ 29岁 电气工科·硕士</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => loadPresetProfile('business_cross')}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 font-medium transition-all shadow-2xs cursor-pointer hover:border-[#c2410c]/60 flex items-center gap-1"
                    >
                      <span>📊 25岁 金融商业·海硕</span>
                    </button>
                  </div>
                </div>

                {/* Age Slider & Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#c2410c]" />
                      <span>主申请人真实年龄 (覆盖 18 ~ 55 岁全年龄段)</span>
                    </label>
                    <span className={`font-serif text-base sm:text-lg font-bold font-mono px-3 py-0.5 rounded-xl border ${
                      age ? 'text-[#c2410c] bg-[#efe9de] border-[#e6dfd8]' : 'text-stone-400 bg-stone-100 border-dashed border-stone-300 text-xs'
                    }`}>
                      {age ? `${age} 周岁` : '请点击选择'}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={18}
                    max={55}
                    value={age ?? 28}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-[#c2410c] cursor-pointer"
                  />

                  {/* Age Category Quick Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: '18-29 岁', desc: '黄金窗口期', target: 28 },
                      { label: '30-39 岁', desc: '骨干黄金期', target: 34 },
                      { label: '40-49 岁', desc: '资历沉淀期', target: 43 },
                      { label: '50-55 岁', desc: '特定高管期', target: 52 },
                    ].map((pill, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAge(pill.target)}
                        className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                          age !== null && (
                            (age >= 18 && age <= 29 && pill.target === 28) ||
                            (age >= 30 && age <= 39 && pill.target === 34) ||
                            (age >= 40 && age <= 49 && pill.target === 43) ||
                            (age >= 50 && pill.target === 52)
                          )
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold">{pill.label}</div>
                        <div className="text-[10px] opacity-75 font-mono">{pill.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marital & Family Status */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-[#c2410c]" />
                    <span>婚姻与家庭随行状况 (影响澳洲/新西兰配偶加分与工签政策)</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        key: 'single',
                        title: '单身 / 独身出海',
                        desc: '无家庭牵绊，澳洲享 10分满格单身加分，启动资金要求最低。',
                      },
                      {
                        key: 'married_partner_none',
                        title: '已婚带配偶 (普通背景)',
                        desc: '配偶可享陪读/开放工签；新西兰可合法全职工作补贴家庭。',
                      },
                      {
                        key: 'married_partner_skilled',
                        title: '已婚配偶具备良好英文与学历',
                        desc: '配偶拥有雅思6分+或技术职评，解锁澳洲/加拿大最高双职工加分。',
                      },
                      {
                        key: 'married_with_children',
                        title: '已婚并育有未成年子女',
                        desc: '重视子女免费公立教育与医疗环境，优选新西兰、爱尔兰与欧陆。',
                      },
                    ].map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setMaritalStatus(m.key as MaritalStatus)}
                        className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                          maritalStatus === m.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-xs">{m.title}</div>
                        <div className="text-[10px] opacity-75 leading-tight">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Domestic City Tier Survey */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#c2410c]" />
                    <span>目前国内常住所在城市层级</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'tier1_megacity', label: '一线城市', sub: '北上广深' },
                      { key: 'new_tier1', label: '新一线 / 强二线', sub: '杭/蓉/汉/苏/宁/陕等' },
                      { key: 'tier2_tier3', label: '普通二三线城市', sub: '省会/地级市' },
                      { key: 'tier4_tier5_county', label: '四五线 / 县域基层', sub: '低生活成本' },
                    ].map((city) => (
                      <button
                        key={city.key}
                        type="button"
                        onClick={() => setDomesticCityTier(city.key as any)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          domesticCityTier === city.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-xs">{city.label}</div>
                        <div className="text-[10px] opacity-75 font-mono">{city.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Departure Motivations (Multi-Select) */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center justify-between">
                    <span>出海核心驱动力 / 最希望改善的痛点 (多选)</span>
                    <span className="text-[10px] text-[#c2410c] font-normal">已选 {departureMotivations.length} 项</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        key: 'workplace_burnout_35age',
                        title: '职场严重内卷 / 996 与 35 岁就业危机',
                        desc: '摆脱无效加班，追求劳动法保障与正常上下班双休。',
                      },
                      {
                        key: 'child_education_anti_involution',
                        title: '下一代身心健康 / 摆脱应试教育焦虑',
                        desc: '让孩子在自然与包容环境中快乐成长，享受免费公立教育。',
                      },
                      {
                        key: 'salary_purchasing_power_roi',
                        title: '时薪购买力与生活性价比 (追求高ROI)',
                        desc: '同等工时赚取更高购买力货币，提升家庭资产抗风险能力。',
                      },
                      {
                        key: 'environment_food_rule_of_law',
                        title: '自然环境、食品安全与法治秩序',
                        desc: '看重清新空气、干净水源、食品安全与可预期的社会规则。',
                      },
                      {
                        key: 'global_asset_mobility',
                        title: '家庭资产多元配置与全球身份对冲',
                        desc: '获取海外永久居留权，拥有随时出海退路与自由通行权。',
                      },
                    ].map((item) => {
                      const isSelected = departureMotivations.includes(item.key);
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => toggleMotivation(item.key)}
                          className={`p-3 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                            isSelected
                              ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                              : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{item.title}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#c2410c]" />}
                          </div>
                          <p className="text-[10px] opacity-75 leading-tight">{item.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2: TARGET EDUCATION & DYNAMIC BRANCHING ================= */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Target Education */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#c2410c]" />
                    <span>意向出海攻读/申请的最高学历路径 (非现有学历)</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'vocational', title: '职校 / 大专技工', sub: '澳洲TAFE/大专文凭' },
                      { key: 'bachelor', title: '全日制本科学士', sub: '3-4年本科' },
                      { key: 'master', title: '硕士 ｜ GD (专升硕)', sub: '新西兰1年GD/专升硕' },
                      { key: 'doctorate', title: '博士学位 (PhD)', sub: '免工作直满及格分' },
                    ].map((edu) => (
                      <button
                        key={edu.key}
                        type="button"
                        onClick={() => setEducationLevel(edu.key as EducationTier)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          educationLevel === edu.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-xs">{edu.title}</div>
                        <div className="text-[10px] opacity-75 font-mono">{edu.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8 Major Career Tracks */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#c2410c]" />
                    <span>专业类别赛道 (选择后自动展开专属深度追问)</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        id: 'it_ai',
                        icon: '💻',
                        name: '计算机与 AI 软件研发',
                        tag: '🟢 德国蓝卡 / 新西兰6分制 / 日本高才',
                        defaultJob: '软件开发 / AI工程 / 数据架构',
                      },
                      {
                        id: 'healthcare',
                        icon: '🩺',
                        name: '护理护工与医疗健康',
                        tag: '🟢 全球第一优先级 65分秒批',
                        defaultJob: '注册护士 / 养老照护 / 物理治疗',
                      },
                      {
                        id: 'trades_skilled',
                        icon: '🔧',
                        name: '蓝领实操技工与工匠 (木工/汽修/电工)',
                        tag: '🟢 澳洲 TRA 技工 / 新西兰绿名单红利',
                        defaultJob: '木工 / 汽修技师 / 电工 / 西厨',
                      },
                      {
                        id: 'business_finance',
                        icon: '📊',
                        name: '文商科与金融会计',
                        tag: '⚠️ 需精准策略转型避坑',
                        defaultJob: '财务分析 / 会计审计 / 跨境运营',
                      },
                      {
                        id: 'teaching',
                        icon: '👶',
                        name: '幼教与中小学教育',
                        tag: '🟢 澳新紧缺保送 / 语言门槛高',
                        defaultJob: '幼教老师 / 中学数学物理教师',
                      },
                      {
                        id: 'engineering_renewables',
                        icon: '⚡',
                        name: '泛工科与新能源电气',
                        tag: '🟢 德国工业核心 / 稳健移民',
                        defaultJob: '电气工程 / 自动化 / 机械设计',
                      },
                      {
                        id: 'media_design',
                        icon: '🎨',
                        name: '传媒、数字艺术与设计',
                        tag: '🟡 法国 / 日本 / 荷兰创意通道',
                        defaultJob: 'UI/UX设计 / 游戏原画 / 3D渲染',
                      },
                      {
                        id: 'law_social',
                        icon: '⚖️',
                        name: '法律、社会学与公共政策',
                        tag: '🟡 高语言要求 / 欧陆定向通道',
                        defaultJob: '法律合规 / 社会工作者 (Social Worker)',
                      },
                    ].map((track) => (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => {
                          setFieldCategory(track.id as CareerFieldCategory);
                          setSpecificJobOrMajor(track.defaultJob);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                          fieldCategory === track.id
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-1.5">
                            <span>{track.icon}</span>
                            <span>{track.name}</span>
                          </span>
                        </div>
                        <div className="text-[10px] font-mono opacity-80">{track.tag}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ================= DYNAMIC ROLE-SPECIFIC BRANCHING ================= */}
                {/* 1. IT / AI Branch */}
                {fieldCategory === 'it_ai' && (
                  <div className="p-4 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-3 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-stone-900 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c2410c]" />
                      <span>IT/AI 专属追问分支：技术栈专长与出海意愿</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'fullstack_backend', label: '后端架构 / 全栈开发' },
                        { key: 'ai_ml_data', label: 'AI/大模型 / 数据科学' },
                        { key: 'cloud_devops_infra', label: '云原生 / DevOps / SRE' },
                        { key: 'mobile_frontend', label: '前端 / 移动端研发' },
                      ].map((stack) => (
                        <button
                          key={stack.key}
                          type="button"
                          onClick={() => setTechStackFocus(stack.key)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                            techStackFocus === stack.key
                              ? 'bg-[#181715] text-white border-stone-900 font-bold'
                              : 'bg-[#faf9f5] text-stone-700 border-[#e6dfd8]'
                          }`}
                        >
                          {stack.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Healthcare Branch */}
                {fieldCategory === 'healthcare' && (
                  <div className="p-4 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-3 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-stone-900 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c2410c]" />
                      <span>医护专属追问分支：执业资质与语言冲刺意愿</span>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { key: 'has_domestic_nurse_license', label: '持有国内注册护士执照' },
                          { key: 'has_medical_physio_degree', label: '全日制医护/理疗本硕' },
                          { key: 'no_license_caregiver', label: '无执照 / 愿转养老照护' },
                        ].map((m) => (
                          <button
                            key={m.key}
                            type="button"
                            onClick={() => setMedicalLicenseStatus(m.key)}
                            className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                              medicalLicenseStatus === m.key
                                ? 'bg-[#181715] text-white border-stone-900 font-bold'
                                : 'bg-[#faf9f5] text-stone-700 border-[#e6dfd8]'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-xs">
                        <span className="text-stone-700 font-medium">是否愿意全力冲刺 PTE 79+ 或 OET 4个B？</span>
                        <button
                          type="button"
                          onClick={() => setHighScoreWillingness(!highScoreWillingness)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                            highScoreWillingness
                              ? 'bg-[#10b981] text-white'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {highScoreWillingness ? '✓ 愿意冲刺' : '✕ 暂无意愿'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Trades / Blue Collar Branch (AU TRA Focus) */}
                {fieldCategory === 'trades_skilled' && (
                  <div className="p-4 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-3 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-stone-900 font-mono flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#c2410c]" />
                        <span>蓝领技工专属追问：具体实操工种 (澳洲 TRA 重点支持)</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { key: 'woodwork_carpentry', label: '🪚 木工 / 建筑木工 (Carpentry)' },
                        { key: 'automotive', label: '🚗 汽修技师 (Automotive)' },
                        { key: 'electrician', label: '⚡ 电工 / 自动化 (Electrician)' },
                        { key: 'welding', label: '🔥 焊工 / 钣金 (Welder)' },
                        { key: 'chef_baker', label: '🍳 西厨 / 主厨 (Commercial Cookery)' },
                      ].map((trade) => (
                        <button
                          key={trade.key}
                          type="button"
                          onClick={() => setTradesSubCategory(trade.key)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                            tradesSubCategory === trade.key
                              ? 'bg-[#181715] text-white border-stone-900 font-bold'
                              : 'bg-[#faf9f5] text-stone-700 border-[#e6dfd8]'
                          }`}
                        >
                          {trade.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Business / Media Branch */}
                {(fieldCategory === 'business_finance' || fieldCategory === 'media_design' || fieldCategory === 'law_social') && (
                  <div className="p-4 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-3 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-stone-900 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c2410c]" />
                      <span>文商传媒专属追问分支：策略转型意向</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        {
                          key: 'cross_degree_stem_transition',
                          title: '🔄 接受跨专业重读紧缺硕士 (如转码/幼教/社工)',
                          desc: '毕业直拿 3 年工签与紧缺加分，成功率提升 300%。',
                        },
                        {
                          key: 'low_cost_europe_transition',
                          title: '💶 转战欧陆免学费国家 (德国/法国/荷兰)',
                          desc: '凭借极低生活成本与语言红利对冲英美澳高门槛。',
                        },
                        {
                          key: 'hold_business_finance',
                          title: '💼 坚持本专业背景 · 冲刺 1.5 倍高薪岗位',
                          desc: '需具备顶尖语言或外企背景，直接拼大厂雇主担保。',
                        },
                      ].map((st) => (
                        <button
                          key={st.key}
                          type="button"
                          onClick={() => setBusinessCareerStrategy(st.key)}
                          className={`w-full p-3 rounded-xl border text-left transition-all space-y-0.5 cursor-pointer ${
                            businessCareerStrategy === st.key
                              ? 'bg-[#181715] text-white border-stone-900 font-bold'
                              : 'bg-[#faf9f5] text-stone-700 border-[#e6dfd8]'
                          }`}
                        >
                          <div className="text-xs">{st.title}</div>
                          <div className="text-[10px] opacity-75 font-normal">{st.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specific Job Detail Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono">
                    具体岗位或主修方向 (可自由补充调整)
                  </label>
                  <input
                    type="text"
                    value={specificJobOrMajor}
                    onChange={(e) => setSpecificJobOrMajor(e.target.value)}
                    placeholder="输入具体专业或工种名称..."
                    className="w-full px-4 py-3 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-base sm:text-xs font-medium text-stone-800 focus:outline-none focus:border-[#c2410c]"
                  />
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3: EXPERIENCE & CERTIFICATION ================= */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Experience Years */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center justify-between">
                    <span>累计全职行业实操/研发经验年限</span>
                    <span className="text-[#c2410c] font-mono font-bold">
                      {experienceYears === 0 ? '应届 / 0 年' : `${experienceYears} 年+`}
                    </span>
                  </label>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: '应届 / 0年', val: 0 },
                      { label: '1 ~ 3 年', val: 2 },
                      { label: '3 ~ 5 年', val: 4 },
                      { label: '5 ~ 10年+', val: 7 },
                    ].map((exp) => (
                      <button
                        key={exp.val}
                        type="button"
                        onClick={() => setExperienceYears(exp.val)}
                        className={`py-3 rounded-xl border text-center transition-all text-xs font-bold cursor-pointer ${
                          experienceYears === exp.val
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Professional Certification Status */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#c2410c]" />
                    <span>是否持有紧缺职业资格 / 技能证书 / 执照认证</span>
                  </label>

                  <div className="space-y-2.5">
                    {[
                      {
                        key: 'certified_trade_or_license',
                        title: '持有官方/行业认可职业资格证书',
                        desc: '例如: 国内中高级电工焊工证、护士执业证、教师资格证、CPA、AWS架构师等。',
                      },
                      {
                        key: 'in_progress',
                        title: '正在备考 / 准备海外认证换证中',
                        desc: '正在筹备 TRA 职评材料、德语认证转换、NZQA 学历认证或相关考级。',
                      },
                      {
                        key: 'none',
                        title: '暂无专业证书 / 纯依靠通用学历工作',
                        desc: '通过常规学历与本地全职工作经验进行申请。',
                      },
                    ].map((cert) => (
                      <button
                        key={cert.key}
                        type="button"
                        onClick={() => setCertificationStatus(cert.key as CertificationStatus)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                          certificationStatus === cert.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-xs">{cert.title}</div>
                        <div className="text-[10px] opacity-75">{cert.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 4: LANGUAGE & HARD FILTER BRANCHING ================= */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* English Tier */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-[#c2410c]" />
                    <span>英语实际水平区间 (雅思 / PTE / 多邻国 / 真实沟通)</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        key: 'none',
                        title: '零基础 / 简单日常',
                        desc: '雅思 4.5-5.0 区间 / 适合技工或欧陆免英文通道',
                      },
                      {
                        key: 'competent',
                        title: '基础达标 (雅思 5.5-6.0 / PTE 42-50)',
                        desc: '满足多数欧洲工签、加拿大基础门槛',
                      },
                      {
                        key: 'proficient',
                        title: '熟练流畅 (雅思 6.5+ / PTE 58-65)',
                        desc: '新西兰 SMC 6分制及格线 / 澳洲 189 准入门槛',
                      },
                      {
                        key: 'superior',
                        title: '顶尖高阶 (雅思 7.5-8.0+ / PTE 79+ 八炸)',
                        desc: '澳洲 GSM 20分满格语言加分 / 加拿大 EE 顶峰',
                      },
                    ].map((lang) => (
                      <button
                        key={lang.key}
                        type="button"
                        onClick={() => setEnglishBand(lang.key as EnglishBandTier)}
                        className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                          englishBand === lang.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-xs">{lang.title}</div>
                        <div className="text-[10px] opacity-75 font-mono leading-tight">{lang.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Second Language Option */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono">
                    现有小语种水平
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'none', label: '无小语种 / 零基础' },
                      { id: 'de', label: '德语 (B1/B2)' },
                      { id: 'fr', label: '法语 (B2/NCLC7)' },
                      { id: 'jp', label: '日语 (N2/N1)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSecondLanguage(item.id as SecondLanguage)}
                        className={`py-2.5 px-1 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                          secondLanguage === item.id
                            ? 'bg-[#c2410c] text-white border-[#c2410c] font-bold'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hard Filter Branch: Willingness to Learn Second Language */}
                <div className="p-4 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#c2410c]" />
                    <span>对于德/法/日等高性价比非纯英语国家，您的语言学习意愿是？</span>
                  </label>

                  <div className="space-y-2">
                    {[
                      {
                        key: 'strict_english_only',
                        title: '🚫 仅考虑纯英语环境，坚决不学二外',
                        desc: '【将触发硬过滤】：德国、法国、芬兰等非英语国家评分将直接惩罚扣减 80 分并移入 Tier 3 风险劝退区。',
                        badge: '触发硬过滤',
                      },
                      {
                        key: 'willing_to_learn_b1',
                        title: '📖 愿意为了低学费与高确定性，在 1-2 年内自学至 B1 基础',
                        desc: '保留德国/欧陆等高性价比推荐，系统将评估学业难度与语言达标路径。',
                        badge: '稳健推荐',
                      },
                      {
                        key: 'has_intermediate_foundation',
                        title: '⚡ 已有一定自学基础 / 接受全浸泡式快速适应',
                        desc: '赋予欧陆免学费国家与日本高度人才额外加分权重。',
                        badge: '优先加权',
                      },
                    ].map((intent) => (
                      <button
                        key={intent.key}
                        type="button"
                        onClick={() => setSecondLanguageIntent(intent.key as any)}
                        className={`w-full p-3 rounded-xl border text-left transition-all space-y-1 cursor-pointer ${
                          secondLanguageIntent === intent.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{intent.title}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                            intent.key === 'strict_english_only' ? 'bg-[#faeaea] text-[#c64545]' : 'bg-[#eaf6ed] text-[#2e7d32]'
                          }`}>
                            {intent.badge}
                          </span>
                        </div>
                        <p className="text-[10px] opacity-75 leading-tight">{intent.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* European Loneliness & Cultural Fit Survey */}
                <div className="p-4 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-2.5">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono">
                    欧陆社会融入与孤独感适应考量
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      {
                        key: 'can_tolerate_solitude',
                        title: '🌲 能享受独处与专注自我',
                        desc: '不在意华人圈子大小，偏好宁静慢节奏。',
                      },
                      {
                        key: 'afraid_of_isolation',
                        title: '🏮 更希望生活在成熟华人便利圈',
                        desc: '较排斥孤独与隐性排外，优选新澳加新等华人多大国。',
                      },
                    ].map((tol) => (
                      <button
                        key={tol.key}
                        type="button"
                        onClick={() => setLonelinessTolerance(tol.key as any)}
                        className={`p-3 rounded-xl border text-left transition-all space-y-0.5 cursor-pointer ${
                          lonelinessTolerance === tol.key
                            ? 'bg-[#181715] text-white border-stone-900 font-bold'
                            : 'bg-[#faf9f5] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="text-xs">{tol.title}</div>
                        <div className="text-[10px] opacity-75">{tol.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 5: BUDGET & PATHWAY ================= */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Total Family Budget */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#10b981]" />
                    <span>家庭可动用总预算 (学费 + 前期安家生活储备)</span>
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        key: 'low_10_25',
                        title: '10 - 25 万',
                        desc: '工薪极限启动',
                        note: '德法免学费 / 技工直发',
                      },
                      {
                        key: 'medium_30_50',
                        title: '30 - 50 万',
                        desc: '主流高性价比',
                        note: '新西兰 / 爱尔兰 1.5年硕',
                      },
                      {
                        key: 'high_50_plus',
                        title: '50 万+',
                        desc: '充裕多轨对冲',
                        note: '英美澳加传统大国全景',
                      },
                    ].map((b) => (
                      <button
                        key={b.key}
                        type="button"
                        onClick={() => setBudgetTier(b.key as BudgetTier)}
                        className={`p-3.5 rounded-2xl border text-center transition-all space-y-1 cursor-pointer ${
                          budgetTier === b.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-sm text-[#c2410c] font-mono">{b.title}</div>
                        <div className="text-[10px] font-semibold">{b.desc}</div>
                        <div className="text-[9px] opacity-75 font-mono">{b.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Pathway */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#c2410c]" />
                    <span>偏好的出海落地路径</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        key: 'direct_job',
                        title: '直接海外找工 / 雇主担保',
                        desc: '不读海外学位，直接凭借国内技能或证书境外找聘书。',
                      },
                      {
                        key: 'study_psw',
                        title: '留学读硕过渡毕业工签 (PSW)',
                        desc: '通过 1-2 年留学获取本地学历，享 2-3 年开放工签积累经验。',
                      },
                      {
                        key: 'trade_skilled',
                        title: '蓝领技工工匠直通出海',
                        desc: '专注于实操技术，低资金成本快速入境上岗。',
                      },
                      {
                        key: 'work_and_learn',
                        title: '边工作边考语言 / 渐进过渡',
                        desc: '先持找工作签或短期签证入境，边积累语言边转化长期身份。',
                      },
                    ].map((p) => (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setPathwayPreference(p.key as PathwayPreference)}
                        className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                          pathwayPreference === p.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-xs">{p.title}</div>
                        <div className="text-[10px] opacity-75 leading-tight">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 6: CORE PRIORITY ================= */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#c2410c]" />
                    <span>本次出海决策的核心诉求第一优先级</span>
                  </label>

                  <div className="space-y-3">
                    {[
                      {
                        key: 'fastest_pr',
                        title: '🚀 追求 100% 永居确定性 (稳妥优先)',
                        desc: '宁可放弃部分高薪，也要选择政策窗口友好、无排期或 1-2 年直通永久居留的国家（如新西兰、爱尔兰、澳洲技工、德国蓝卡、日本高才）。',
                      },
                      {
                        key: 'high_roi_salary',
                        title: '💰 追求高时薪与职业上限 (回报优先)',
                        desc: '看重行业上限与薪资回报比，愿意承担一定政策竞争或大厂挑战（如美国、澳洲、新加坡）。',
                      },
                      {
                        key: 'child_education_livable',
                        title: '🏡 追求全家带娃与子女免费低成本教育 (家庭福祉)',
                        desc: '家庭同行，看重配偶全职工作权、公立中小学免学费、自然环境与社会治安（如新西兰、爱尔兰、北欧）。',
                      },
                    ].map((cp) => (
                      <button
                        key={cp.key}
                        type="button"
                        onClick={() => setCorePriority(cp.key as CorePriority)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all space-y-1.5 cursor-pointer ${
                          corePriority === cp.key
                            ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-sm'
                            : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                        }`}
                      >
                        <div className="font-bold text-sm">{cp.title}</div>
                        <div className="text-xs opacity-75 leading-relaxed">{cp.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 7: RESULTS (14-COUNTRY TIER MATRIX + FATAL BOTTLENECKS + CURATED PATHWAYS) ================= */}
            {currentStep === 7 && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Result Top Summary Banner */}
                <div className="p-5 rounded-3xl bg-[#efe9de] border border-[#e6dfd8] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e6dfd8] pb-2.5">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                        GLOBAL 14-COUNTRY TIER MATRIX // 2026 深度精算版
                      </div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        【{profileSummaryStr}】的 14 国推荐梯队：
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-3 py-1.5 rounded-xl bg-[#faf9f5] hover:bg-[#efe9de] border border-[#e6dfd8] text-stone-700 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                        title="返回第 1 步调整背景参数重新测算"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                        <span>调整参数</span>
                      </button>

                      <button
                        onClick={handleSaveAssessment}
                        disabled={isSaving}
                        className="px-3 py-1.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                      >
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>{isSaving ? '保存中...' : '保存此方案'}</span>
                      </button>

                      {onOpenSavedHistory && (
                        <button
                          onClick={onOpenSavedHistory}
                          className="px-3 py-1.5 rounded-xl bg-[#faf9f5] hover:bg-[#efe9de] border border-[#e6dfd8] text-stone-700 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <FolderKanban className="w-3.5 h-3.5 text-stone-500" />
                          <span>历史方案</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {saveSuccessNotice && (
                    <div className="p-2.5 rounded-xl bg-[#eaf6ed] border border-[#c5e8ce] text-xs text-[#2e7d32] flex items-center gap-1.5 animate-in fade-in duration-200">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>方案已成功保存到您的专属智库！可在顶部“历史档案”随时查阅。</span>
                    </div>
                  )}

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-[11px] font-mono text-stone-500">梯队过滤：</span>
                    <button
                      onClick={() => setActiveTierFilter('ALL')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        activeTierFilter === 'ALL'
                          ? 'bg-[#181715] text-white font-bold'
                          : 'bg-[#faf9f5] text-stone-600 border border-[#e6dfd8]'
                      }`}
                    >
                      全部 14 国 ({results.length})
                    </button>
                    <button
                      onClick={() => setActiveTierFilter('tier1')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        activeTierFilter === 'tier1'
                          ? 'bg-[#2e7d32] text-white font-bold'
                          : 'bg-[#faf9f5] text-[#2e7d32] border border-[#c5e8ce]'
                      }`}
                    >
                      🟢 Tier 1 直通 ({results.filter((r) => r.tier === 'tier1').length})
                    </button>
                    <button
                      onClick={() => setActiveTierFilter('tier2')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        activeTierFilter === 'tier2'
                          ? 'bg-[#996500] text-white font-bold'
                          : 'bg-[#faf9f5] text-[#996500] border border-[#f4e2a8]'
                      }`}
                    >
                      🟡 Tier 2 过渡 ({results.filter((r) => r.tier === 'tier2').length})
                    </button>
                    <button
                      onClick={() => setActiveTierFilter('tier3')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        activeTierFilter === 'tier3'
                          ? 'bg-[#c64545] text-white font-bold'
                          : 'bg-[#faf9f5] text-[#c64545] border border-[#f5c6c6]'
                      }`}
                    >
                      🔴 Tier 3 避坑 ({results.filter((r) => r.tier === 'tier3').length})
                    </button>
                  </div>
                </div>

                {/* Country Tier Cards */}
                <div className="space-y-4">
                  {filteredResults.map((res, idx) => {
                    const isTier1 = res.tier === 'tier1';
                    const isTier2 = res.tier === 'tier2';
                    const isTimelineUnlocked = unlockedTimelineCountry === res.countryCode;
                    const isCuratedUnlocked = unlockedCuratedCountry === res.countryCode;

                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl p-5 border transition-all space-y-3.5 ${
                          isTier1
                            ? 'bg-[#f4f9f4] border-[#c5e8ce] shadow-xs'
                            : isTier2
                            ? 'bg-[#fdfbf6] border-[#e6dfd8]'
                            : 'bg-[#faf2f2] border-[#f5c6c6]'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#e6dfd8]/70 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{res.flag}</span>
                            <div>
                              <div className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                                <span>{res.countryName}</span>
                                <span
                                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                    isTier1
                                      ? 'bg-[#eaf6ed] text-[#2e7d32] border border-[#c5e8ce]'
                                      : isTier2
                                      ? 'bg-[#fdf6e2] text-[#996500] border border-[#f4e2a8]'
                                      : 'bg-[#faeaea] text-[#a62828] border border-[#f5c6c6]'
                                  }`}
                                >
                                  {res.tierLabel}
                                </span>
                              </div>
                              <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                                主力通道: {res.primaryVisa}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] font-mono text-stone-400">适配指数</div>
                            <div
                              className={`font-serif text-2xl font-bold font-mono ${
                                isTier1
                                  ? 'text-[#2e7d32]'
                                  : isTier2
                                  ? 'text-[#996500]'
                                  : 'text-[#c64545]'
                              }`}
                            >
                              {res.matchScore}%
                            </div>
                          </div>
                        </div>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8]">
                            <span className="text-stone-400 text-[10px] block">预期获邀 / 永居周期</span>
                            <span className="font-bold text-stone-800 text-[11px]">
                              {res.estimatedTimeline}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8]">
                            <span className="text-stone-400 text-[10px] block">法定薪资 / 起薪门槛</span>
                            <span className="font-bold text-stone-800 text-[11px]">
                              {res.statutoryWage}
                            </span>
                          </div>
                        </div>

                        {/* Why Matched Description */}
                        <p className="text-xs text-stone-700 leading-relaxed bg-[#faf9f5]/80 p-3 rounded-xl border border-[#e6dfd8]/60">
                          <span className="font-bold text-stone-900">💡 路径深度解析：</span>
                          {res.whyMatched}
                        </p>

                        {/* ⚠️ FATAL BOTTLENECKS SPECIAL CARD (UNBLURRED WHEN UNLOCKED) */}
                        <div className={`p-3.5 rounded-2xl border space-y-2 text-xs relative overflow-hidden ${
                          isPrivilegeUnlocked
                            ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]'
                            : 'bg-[#faeaea] border-[#f5c6c6] text-[#a62828]'
                        }`}>
                          <div className="font-bold flex items-center justify-between font-mono text-[11px]">
                            <span className="flex items-center gap-1.5">
                              {isPrivilegeUnlocked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-[#c64545]" />
                              )}
                              <span>
                                {isPrivilegeUnlocked
                                  ? `【🟢 研报特权已解锁 · 全量 ${res.fatalBottlenecks.length} 项致命软肋与避坑要点】`
                                  : '【⚠️ 核心致命软肋与客观风险警示】'}
                              </span>
                            </span>
                            {isPrivilegeUnlocked && (
                              <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                                已解锁全部软肋
                              </span>
                            )}
                          </div>

                          {/* When Unlocked: Display ALL items clearly without blur */}
                          {isPrivilegeUnlocked ? (
                            <ul className="pl-4 list-disc text-[11px] leading-relaxed space-y-1 text-stone-800">
                              {res.fatalBottlenecks.map((fb, fidx) => (
                                <li key={fidx}>{fb}</li>
                              ))}
                            </ul>
                          ) : (
                            <>
                              {/* Item 1: Displayed Clearly */}
                              <ul className="pl-4 list-disc text-[11px] leading-relaxed">
                                <li>{res.fatalBottlenecks[0] || '本地初级岗位竞争加剧，需要提前锁定精准紧缺职业代码与打税薪资。'}</li>
                              </ul>

                              {/* Items 2+: Blurred with Floating Lock Callout */}
                              {res.fatalBottlenecks.length > 1 && (
                                <div className="relative mt-2 pt-1">
                                  {/* Blurred Text Lines */}
                                  <ul className="pl-4 list-disc text-[11px] leading-relaxed filter blur-[4px] opacity-40 select-none pointer-events-none space-y-1">
                                    {res.fatalBottlenecks.slice(1).map((fb, fidx) => (
                                      <li key={fidx}>{fb}</li>
                                    ))}
                                  </ul>

                                  {/* Floating Lock Card */}
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/35 backdrop-blur-[2px] rounded-xl p-1.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onOpenConsultation) {
                                          onOpenConsultation(`${res.countryName} · ${res.primaryVisa} 10+ 页深度量化推演研报`, true);
                                        }
                                      }}
                                      className="px-3 py-1.5 rounded-xl bg-white/95 border border-[#fed7aa] shadow-xs text-xs font-bold text-[#c2410c] hover:bg-[#fff7ed] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer max-w-full"
                                    >
                                      <Lock className="w-3.5 h-3.5 text-[#c2410c] shrink-0" />
                                      <span className="truncate text-[11px]">
                                        针对您背景的 {res.fatalBottlenecks.length - 1} 项潜在拒签/高额隐性成本警示已收录至研报
                                      </span>
                                      <span className="text-[10px] bg-[#c2410c] text-white px-1.5 py-0.5 rounded font-mono shrink-0">
                                        解锁
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {/* 🎓 CURATED HIGH-ROI PATHWAY TIERS & SCHOOLS (UNBLURRED WHEN UNLOCKED) */}
                        {res.curatedPathways && res.curatedPathways.length > 0 && (
                          <div className="border-t border-[#e6dfd8]/70 pt-2.5">
                            {isCuratedUnlocked ? (
                              <div className="bg-[#faf9f5] p-3.5 rounded-xl border border-[#e6dfd8] space-y-3 text-xs">
                                <div className="text-[11px] font-bold text-stone-800 flex items-center justify-between font-mono">
                                  <span className="flex items-center gap-1.5">
                                    <School className="w-3.5 h-3.5 text-[#c2410c]" />
                                    <span>【{res.countryName}】高 ROI 示范课程与代表院校梯队{isPrivilegeUnlocked ? '（研报特权已解锁）' : ''}：</span>
                                  </span>
                                  <button
                                    onClick={() => setUnlockedCuratedCountry(null)}
                                    className="text-stone-400 hover:text-stone-700 text-[10px] cursor-pointer"
                                  >
                                    收起 ↑
                                  </button>
                                </div>

                                {isPrivilegeUnlocked ? (
                                  <div className="space-y-2.5">
                                    {res.curatedPathways.map((cp, cidx) => (
                                      <div
                                        key={cidx}
                                        className="p-3 rounded-xl bg-[#efe9de]/50 border border-[#e6dfd8] space-y-1"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-stone-900 text-xs">{cp.pathwayName}</span>
                                          <span className="text-[10px] font-mono text-stone-500 bg-[#faf9f5] px-2 py-0.5 rounded border border-[#e6dfd8]">
                                            {cp.duration}
                                          </span>
                                        </div>
                                        <div className="text-[11px] text-[#c2410c] font-mono font-medium">
                                          代表院校：{cp.representativeSchools.join('、')}
                                        </div>
                                        <p className="text-[11px] text-stone-600 leading-relaxed">
                                          {cp.highlights}（参考学费：{cp.estimatedTuition}）
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="relative overflow-hidden pt-1">
                                    <div className="space-y-2.5 filter blur-[5px] opacity-35 select-none pointer-events-none">
                                      <div className="p-3 rounded-xl bg-stone-200/80 border border-stone-300 space-y-1">
                                        <div className="h-4 bg-stone-300 rounded w-1/3" />
                                        <div className="h-3 bg-stone-300 rounded w-2/3" />
                                        <div className="h-3 bg-stone-300 rounded w-full" />
                                      </div>
                                      <div className="p-3 rounded-xl bg-stone-200/80 border border-stone-300 space-y-1">
                                        <div className="h-4 bg-stone-300 rounded w-1/2" />
                                        <div className="h-3 bg-stone-300 rounded w-3/4" />
                                      </div>
                                    </div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#faf9f5] via-[#faf9f5]/85 to-transparent backdrop-blur-[2px] p-3 text-center space-y-2">
                                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5 font-serif">
                                        <Lock className="w-4 h-4 text-[#c2410c]" />
                                        <span>【{res.countryName}】{res.curatedPathways.length} 个代表院校与对口高 ROI 课程已锁定</span>
                                      </div>
                                      <button
                                        onClick={() => {
                                          if (onOpenConsultation) {
                                            onOpenConsultation(`${res.countryName} · 高 ROI 示范课程与代表院校研报`, true);
                                          }
                                        }}
                                        className="px-4 py-1.5 rounded-xl bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <Lock className="w-3.5 h-3.5" />
                                        <span>解锁研报查看完整推演 (¥19.9)</span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => setUnlockedCuratedCountry(res.countryCode)}
                                className="w-full py-2.5 px-3.5 rounded-xl bg-[#efe9de]/70 hover:bg-[#efe9de] border border-[#e6dfd8] text-xs text-stone-700 font-medium flex items-center justify-between transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-1.5 text-[11px]">
                                  <School className="w-3.5 h-3.5 text-[#c2410c]" />
                                  <span>查看该国高 ROI 示范课程方案与代表院校 ({res.curatedPathways.length} 个精选方案)</span>
                                </span>
                                <span className={`text-[11px] font-bold flex items-center gap-1 ${isPrivilegeUnlocked ? 'text-emerald-700' : 'text-[#c2410c]'}`}>
                                  {isPrivilegeUnlocked ? (
                                    <span>🟢 已解锁 · 展开院校 ↓</span>
                                  ) : (
                                    <>
                                      <Lock className="w-3 h-3" />
                                      <span>解锁查看 ↓</span>
                                    </>
                                  )}
                                </span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* 3-Year Timeline Plan (UNBLURRED WHEN UNLOCKED) */}
                        {res.timeline3YearPlan && (
                          <div className="border-t border-[#e6dfd8]/70 pt-2.5">
                            {isTimelineUnlocked ? (
                              <div className="bg-[#faf9f5] p-3.5 rounded-xl border border-[#e6dfd8] space-y-2 text-xs">
                                <div className="text-[11px] font-bold text-stone-800 flex items-center justify-between font-mono">
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-[#c2410c]" />
                                    <span>【{res.countryName}】3 年落地全景时间线甘特规划{isPrivilegeUnlocked ? '（研报特权已解锁）' : ''}：</span>
                                  </span>
                                  <button
                                    onClick={() => setUnlockedTimelineCountry(null)}
                                    className="text-stone-400 hover:text-stone-700 text-[10px] cursor-pointer"
                                  >
                                    收起 ↑
                                  </button>
                                </div>

                                {isPrivilegeUnlocked ? (
                                  <div className="space-y-1.5 text-[11px] text-stone-600">
                                    <div>
                                      <span className="font-bold text-stone-800 font-mono">第 1 年：</span>
                                      {res.timeline3YearPlan.year1}
                                    </div>
                                    <div>
                                      <span className="font-bold text-stone-800 font-mono">第 2 年：</span>
                                      {res.timeline3YearPlan.year2}
                                    </div>
                                    <div>
                                      <span className="font-bold text-stone-800 font-mono">第 3 年：</span>
                                      {res.timeline3YearPlan.year3}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="relative overflow-hidden pt-1">
                                    <div className="space-y-2 filter blur-[5px] opacity-35 select-none pointer-events-none">
                                      <div className="h-4 bg-stone-300 rounded w-5/6" />
                                      <div className="h-4 bg-stone-300 rounded w-4/6" />
                                      <div className="h-4 bg-stone-300 rounded w-full" />
                                    </div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#faf9f5] via-[#faf9f5]/85 to-transparent backdrop-blur-[2px] p-3 text-center space-y-2">
                                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5 font-serif">
                                        <Lock className="w-4 h-4 text-[#c2410c]" />
                                        <span>【{res.countryName}】3 年落地全景时间线与阶段卡点已锁定</span>
                                      </div>
                                      <button
                                        onClick={() => {
                                          if (onOpenConsultation) {
                                            onOpenConsultation(`${res.countryName} · 3年落地时间线与阶段卡点研报`, true);
                                          }
                                        }}
                                        className="px-4 py-1.5 rounded-xl bg-[#c2410c] text-white text-xs font-bold shadow-xs hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <Lock className="w-3.5 h-3.5" />
                                        <span>解锁研报查看完整推演 (¥19.9)</span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => setUnlockedTimelineCountry(res.countryCode)}
                                className="w-full py-2.5 px-3.5 rounded-xl bg-[#efe9de]/70 hover:bg-[#efe9de] border border-[#e6dfd8] text-xs text-stone-700 font-medium flex items-center justify-between transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-1.5 text-[11px]">
                                  <Clock className="w-3.5 h-3.5 text-[#c2410c]" />
                                  <span>查看该国 3 年落地全景时间线与阶段卡点</span>
                                </span>
                                <span className={`text-[11px] font-bold flex items-center gap-1 ${isPrivilegeUnlocked ? 'text-emerald-700' : 'text-[#c2410c]'}`}>
                                  {isPrivilegeUnlocked ? (
                                    <span>🟢 已解锁 · 展开时间线 ↓</span>
                                  ) : (
                                    <>
                                      <Lock className="w-3 h-3" />
                                      <span>解锁查看 ↓</span>
                                    </>
                                  )}
                                </span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* Card Bottom Actions: Official Legislation Direct Link + B2C Report Unlock */}
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-[#e6dfd8]/60">
                          <a
                            href={res.officialDocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf9f5] hover:bg-[#efe9de] border border-[#e6dfd8] text-[11px] font-mono font-medium text-[#c2410c] transition-colors"
                          >
                            <span>🏛️ 移民局最新法案直链</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => {
                                if (onOpenConsultation) {
                                  onOpenConsultation(`${res.countryName} · ${res.primaryVisa} 10+ 页深度量化推演研报`, true);
                                } else {
                                  setSelectedReportCountry(res);
                                }
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>📋 解锁 10+ 页深度量化推演研报 (¥19.9)</span>
                            </button>

                            <button
                              onClick={() => handleNavigateToPathway(res.visaSlug, res.countryCode)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#181715] hover:bg-[#c2410c] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                            >
                              <span>{res.countryName} 决策树</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Validation Warning Alert */}
        {stepValidationError && currentStep < 7 && !isCalculating && (
          <div className="mx-4 sm:mx-6 p-2.5 rounded-2xl bg-[#faeaea] border border-[#f5c6c6] text-xs text-[#c64545] font-semibold flex items-center justify-between animate-bounce duration-300">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-[#c64545]" />
              <span>{stepValidationError}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">⚠️ 必选项</span>
          </div>
        )}

        {/* Drawer Bottom Action Toolbar */}
        <div className="p-4 sm:p-5 border-t border-[#e6dfd8] bg-[#efe9de]/50 flex items-center justify-between safe-bottom">
          {isCalculating ? (
            <div className="w-full flex items-center justify-center py-2 text-xs font-mono text-stone-600 gap-2">
              <Sparkles className="w-4 h-4 text-[#c2410c] animate-spin" />
              <span className="font-semibold">AI 神经计算引擎正在多核并行匹配 14 国准入门槛...</span>
            </div>
          ) : currentStep > 1 && currentStep < 7 ? (
            <button
              onClick={() => setCurrentStep((s) => (s - 1) as any)}
              className="px-4 py-2.5 rounded-xl bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 text-xs font-semibold border border-[#e6dfd8] flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一步</span>
            </button>
          ) : (
            <div />
          )}

          {!isCalculating && (currentStep < 6 ? (
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-semibold flex items-center gap-1.5 shadow-card-hover transition-all cursor-pointer min-h-[44px]"
            >
              <span>下一步</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : currentStep === 6 ? (
            <button
              onClick={handleTriggerCalculate}
              className="px-6 sm:px-8 py-3 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold flex items-center gap-2 shadow-card-hover transition-all cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>生成 14 国逆向选国梯队</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#181715] hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              完成并返回大盘
            </button>
          ))}
        </div>
      </motion.div>

      {/* B2C Paid Report Preview & Unlock Modal */}
      {selectedReportCountry && (
        <ReportUnlockModal
          isOpen={!!selectedReportCountry}
          onClose={() => setSelectedReportCountry(null)}
          targetCountryName={selectedReportCountry.countryName}
          targetCountryFlag={selectedReportCountry.flag}
          profileSummary={profileSummaryStr}
        />
      )}
    </div>
  );
};
