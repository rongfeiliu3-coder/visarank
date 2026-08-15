import type { CountryCode } from './country';
import type { CapGroupSummary, RuleCategory } from './rule';

export type LanguageExamType =
  | 'IELTS_G'
  | 'IELTS_A'
  | 'PTE_A'
  | 'TOEFL_IBT'
  | 'CELPIP_G'
  | 'DUOLINGO'
  | 'NONE';

export type AustralianEnglishBand = 'None' | 'Competent' | 'Proficient' | 'Superior';

export type EducationLevel =
  | 'DOCTORATE'
  | 'MASTER'
  | 'POST_GRADUATE_DIPLOMA'
  | 'BACHELOR_HONOURS'
  | 'BACHELOR'
  | 'TRADE_DIPLOMA'
  | 'ASSOCIATE_DEGREE'
  | 'SECONDARY'
  | 'OTHER';

export interface UserEducationProfile {
  level: EducationLevel;
  field?: string;
  isStem: boolean;
  countryOfStudy: string; // e.g. "NZ", "AU", "CA", "CN", "US"
  isLocalStudy: boolean;
  studyDurationYears: number;
  hasRegionalStudyBonus?: boolean;
}

export interface UserExperienceProfile {
  overseasYears: number;
  localYears: number;
  occupationCode: string;
  isCurrentEmployed: boolean;
  isCloselyRelatedToStudy?: boolean;
}

export interface UserLanguageProfile {
  examType: LanguageExamType;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  overall: number;
  computedCLB?: number; // Canadian Language Benchmark (4 - 10+)
  computedAUBand?: AustralianEnglishBand;
}

export interface UserJobOfferProfile {
  hasOffer: boolean;
  jobTitle?: string;
  occupationCode?: string;
  isAccreditedEmployer?: boolean;
  hourlyRate?: number;
  annualSalary?: number;
  medianSalaryMultiplier?: number; // e.g. 1.5x or 2.0x median wage
  isRegional?: boolean;
  contractType?: 'permanent' | 'fixed_term_12m_plus' | 'fixed_term_short' | 'casual';
}

export interface UserRegistrationProfile {
  hasRegistration: boolean;
  tierLevel?: number; // e.g. 3, 4, 5, 6 for NZ occupational registration tier
  authorityName?: string;
}

export interface UserPartnerProfile {
  hasPartner: boolean;
  isCitizenOrPR: boolean;
  hasCompetentEnglish: boolean;
  hasSkillAssessment: boolean;
  partnerOccupationCode?: string;
  partnerEducationLevel?: EducationLevel;
}

export interface UserStateNominationProfile {
  isApplying: boolean;
  stateOrProvinceCode?: string;
  nominationCategory?: '190' | '491_state' | '491_family' | 'pnp_express_entry' | 'pnp_base';
}

export interface UserOtherFactorsProfile {
  hasNaatiCcl?: boolean;
  completedProfessionalYear?: boolean;
  hasDesignatedAreaRelative?: boolean;
  hasLmiaApproved?: boolean;
  frenchProficiency?: boolean;
}

export interface UserProfile {
  age: number;
  targetCountry: CountryCode;
  targetVisaId?: string;
  education: UserEducationProfile;
  experience: UserExperienceProfile;
  language: UserLanguageProfile;
  jobOffer: UserJobOfferProfile;
  registration?: UserRegistrationProfile;
  partner: UserPartnerProfile;
  stateNomination?: UserStateNominationProfile;
  otherFactors?: UserOtherFactorsProfile;
}

export interface EvaluationRequest {
  profile: UserProfile;
  visaId: string;
}

export interface RuleEvaluationItem {
  ruleId: string;
  ruleCode: string;
  category: RuleCategory;
  name: string;
  chineseName: string;
  matched: boolean;
  isMandatory: boolean;
  rawPoints: number;
  appliedPoints: number;
  capGroup?: string;
  description: string;
  detailMessage?: string;
}

export interface ImprovementScenario {
  scenarioTitle: string;
  category: RuleCategory;
  potentialAdditionalPoints: number;
  effortLevel: 'low' | 'medium' | 'high';
  description: string;
  actionableStep: string;
}

export interface GapAnalysis {
  pointsShortage: number;
  criticalDeficiencies: string[];
  quickWinSuggestions: string[];
  potentialScenarios: ImprovementScenario[];
}

export interface EvaluationResult {
  visaId: string;
  visaName: string;
  countryCode: CountryCode;
  isEligible: boolean; // Must meet all mandatory rules AND threshold score
  meetsMandatoryRequirements: boolean;
  passThreshold: boolean;
  totalScore: number;
  thresholdScore: number;
  disqualificationReasons: string[];
  scoreByCategory: Record<string, number>;
  capGroupSummaries: Record<string, CapGroupSummary>;
  ruleBreakdown: RuleEvaluationItem[];
  gapAnalysis: GapAnalysis;
  evaluatedAt: string;
}

// ==============================================================================
// 6-Dimensional Deep Profile & Global Reverse Tier Evaluation Types
// ==============================================================================

export type MaritalStatus =
  | 'single'
  | 'married_partner_none'
  | 'married_partner_skilled'
  | 'married_with_children';

export type EducationTier = 'vocational' | 'bachelor' | 'master' | 'doctorate';

export type CareerFieldCategory =
  | 'it_ai'
  | 'healthcare'
  | 'teaching'
  | 'engineering_renewables'
  | 'trades_skilled'
  | 'business_finance'
  | 'media_design'
  | 'law_social';

export type CertificationStatus = 'certified_trade_or_license' | 'in_progress' | 'none';

export type EnglishBandTier = 'none' | 'competent' | 'proficient' | 'superior';

export type SecondLanguage = 'none' | 'de' | 'fr' | 'jp';

export type BudgetTier = 'low_10_25' | 'medium_30_50' | 'high_50_plus';

export type PathwayPreference =
  | 'direct_job'
  | 'study_psw'
  | 'trade_skilled'
  | 'work_and_learn';

export type CorePriority = 'fastest_pr' | 'high_roi_salary' | 'child_education_livable';

export interface CuratedPathwayTier {
  pathwayName: string;
  representativeSchools: string[];
  duration: string;
  estimatedTuition: string;
  highlights: string;
}

export interface MultiDimAssessmentProfile {
  age: number;
  maritalStatus: MaritalStatus;
  educationLevel: EducationTier;
  targetDegreeLevel?: 'vocational_trade' | 'bachelor' | 'master_gd' | 'doctorate';
  fieldCategory: CareerFieldCategory;
  specificJobOrMajor?: string;
  // Role-Specific Branching Fields
  techStackFocus?: string;
  medicalLicenseStatus?: string;
  highScoreWillingness?: boolean;
  tradesSubCategory?: string;
  businessCareerStrategy?: string;
  experienceYears: number;
  certificationStatus: CertificationStatus;
  englishBand: EnglishBandTier;
  secondLanguage: SecondLanguage;
  secondLanguageIntent?: 'strict_english_only' | 'willing_to_learn_b1' | 'has_intermediate_foundation';
  lonelinessTolerance?: 'can_tolerate_solitude' | 'afraid_of_isolation';
  departureMotivations?: string[];
  domesticCityTier?: 'tier1_megacity' | 'new_tier1' | 'tier2_tier3' | 'tier4_tier5_county';
  budgetTier: BudgetTier;
  pathwayPreference: PathwayPreference;
  corePriority: CorePriority;
  // Constraint Trade-off Fields
  languageLearningWillingness?: 'english_only' | 'willing_to_learn_de_jp_fr';
  corePriorityTradeOff?: 'guaranteed_pr' | 'high_roi_salary' | 'family_low_cost_education';
}

export interface B2CReportSnippet {
  monthByMonthPreview: string[];
  riskHedgingPlanB: string;
  peerCaseBenchmark: string;
}

export interface B2BLegalServiceInfo {
  licensedTitle: string;
  verifiedAuthority: string;
  consultationDuration: string;
  jurisdictionName: string;
}

export interface GlobalTierMatchItem {
  countryCode: CountryCode;
  countryName: string;
  flag: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  tierLabel: string;
  matchScore: number;
  primaryVisa: string;
  visaSlug: string;
  estimatedTimeline: string;
  statutoryWage: string;
  whyMatched: string;
  keyBottleneck?: string;
  fatalBottlenecks: string[]; // 2~3 objective bottleneck points & hard truths
  officialDocUrl: string;
  curatedPathways?: CuratedPathwayTier[];
  b2cReportSnippet?: B2CReportSnippet;
  b2bLegalServiceInfo?: B2BLegalServiceInfo;
  timeline3YearPlan?: {
    year1: string;
    year2: string;
    year3: string;
  };
}
