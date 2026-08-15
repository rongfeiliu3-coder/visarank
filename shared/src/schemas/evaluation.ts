import { z } from 'zod';
import { CountryCodeSchema } from './country';
import { CapGroupSummarySchema, RuleCategorySchema } from './rule';

export const LanguageExamTypeSchema = z.enum([
  'IELTS_G',
  'IELTS_A',
  'PTE_A',
  'TOEFL_IBT',
  'CELPIP_G',
  'DUOLINGO',
  'NONE',
]);

export const AustralianEnglishBandSchema = z.enum([
  'None',
  'Competent',
  'Proficient',
  'Superior',
]);

export const EducationLevelSchema = z.enum([
  'DOCTORATE',
  'MASTER',
  'POST_GRADUATE_DIPLOMA',
  'BACHELOR_HONOURS',
  'BACHELOR',
  'TRADE_DIPLOMA',
  'ASSOCIATE_DEGREE',
  'SECONDARY',
  'OTHER',
]);

export const UserEducationProfileSchema = z.object({
  level: EducationLevelSchema,
  field: z.string().optional(),
  isStem: z.boolean().default(false),
  countryOfStudy: z.string().default('CN'),
  isLocalStudy: z.boolean().default(false),
  studyDurationYears: z.number().nonnegative().default(0),
  hasRegionalStudyBonus: z.boolean().optional(),
});

export const UserExperienceProfileSchema = z.object({
  overseasYears: z.number().nonnegative().default(0),
  localYears: z.number().nonnegative().default(0),
  occupationCode: z.string().default(''),
  isCurrentEmployed: z.boolean().default(false),
  isCloselyRelatedToStudy: z.boolean().optional(),
});

export const UserLanguageProfileSchema = z.object({
  examType: LanguageExamTypeSchema.default('NONE'),
  listening: z.number().nonnegative().default(0),
  reading: z.number().nonnegative().default(0),
  writing: z.number().nonnegative().default(0),
  speaking: z.number().nonnegative().default(0),
  overall: z.number().nonnegative().default(0),
  computedCLB: z.number().int().min(0).max(12).optional(),
  computedAUBand: AustralianEnglishBandSchema.optional(),
});

export const UserJobOfferProfileSchema = z.object({
  hasOffer: z.boolean().default(false),
  jobTitle: z.string().optional(),
  occupationCode: z.string().optional(),
  isAccreditedEmployer: z.boolean().optional(),
  hourlyRate: z.number().nonnegative().optional(),
  annualSalary: z.number().nonnegative().optional(),
  medianSalaryMultiplier: z.number().nonnegative().optional(),
  isRegional: z.boolean().optional(),
  contractType: z.enum(['permanent', 'fixed_term_12m_plus', 'fixed_term_short', 'casual']).optional(),
});

export const UserRegistrationProfileSchema = z.object({
  hasRegistration: z.boolean().default(false),
  tierLevel: z.number().int().min(1).max(6).optional(),
  authorityName: z.string().optional(),
});

export const UserPartnerProfileSchema = z.object({
  hasPartner: z.boolean().default(false),
  isCitizenOrPR: z.boolean().default(false),
  hasCompetentEnglish: z.boolean().default(false),
  hasSkillAssessment: z.boolean().default(false),
  partnerOccupationCode: z.string().optional(),
  partnerEducationLevel: EducationLevelSchema.optional(),
});

export const UserStateNominationProfileSchema = z.object({
  isApplying: z.boolean().default(false),
  stateOrProvinceCode: z.string().optional(),
  nominationCategory: z.enum(['190', '491_state', '491_family', 'pnp_express_entry', 'pnp_base']).optional(),
});

export const UserOtherFactorsProfileSchema = z.object({
  hasNaatiCcl: z.boolean().optional(),
  completedProfessionalYear: z.boolean().optional(),
  hasDesignatedAreaRelative: z.boolean().optional(),
  hasLmiaApproved: z.boolean().optional(),
  frenchProficiency: z.boolean().optional(),
});

export const UserProfileSchema = z.object({
  age: z.number().int().min(16).max(99),
  targetCountry: CountryCodeSchema,
  targetVisaId: z.string().optional(),
  education: UserEducationProfileSchema,
  experience: UserExperienceProfileSchema,
  language: UserLanguageProfileSchema,
  jobOffer: UserJobOfferProfileSchema,
  registration: UserRegistrationProfileSchema.optional(),
  partner: UserPartnerProfileSchema,
  stateNomination: UserStateNominationProfileSchema.optional(),
  otherFactors: UserOtherFactorsProfileSchema.optional(),
});

export const EvaluationRequestSchema = z.object({
  profile: UserProfileSchema,
  visaId: z.string().min(1),
});

export const RuleEvaluationItemSchema = z.object({
  ruleId: z.string(),
  ruleCode: z.string(),
  category: RuleCategorySchema,
  name: z.string(),
  chineseName: z.string(),
  matched: z.boolean(),
  isMandatory: z.boolean(),
  rawPoints: z.number(),
  appliedPoints: z.number(),
  capGroup: z.string().optional(),
  description: z.string(),
  detailMessage: z.string().optional(),
});

export const ImprovementScenarioSchema = z.object({
  scenarioTitle: z.string(),
  category: RuleCategorySchema,
  potentialAdditionalPoints: z.number(),
  effortLevel: z.enum(['low', 'medium', 'high']),
  description: z.string(),
  actionableStep: z.string(),
});

export const GapAnalysisSchema = z.object({
  pointsShortage: z.number(),
  criticalDeficiencies: z.array(z.string()),
  quickWinSuggestions: z.array(z.string()),
  potentialScenarios: z.array(ImprovementScenarioSchema),
});

export const EvaluationResultSchema = z.object({
  visaId: z.string(),
  visaName: z.string(),
  countryCode: CountryCodeSchema,
  isEligible: z.boolean(),
  meetsMandatoryRequirements: z.boolean(),
  passThreshold: z.boolean(),
  totalScore: z.number(),
  thresholdScore: z.number(),
  disqualificationReasons: z.array(z.string()),
  scoreByCategory: z.record(z.string(), z.number()),
  capGroupSummaries: z.record(z.string(), CapGroupSummarySchema),
  ruleBreakdown: z.array(RuleEvaluationItemSchema),
  gapAnalysis: GapAnalysisSchema,
  evaluatedAt: z.string(),
});

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
export type EvaluationRequestSchemaType = z.infer<typeof EvaluationRequestSchema>;
export type EvaluationResultSchemaType = z.infer<typeof EvaluationResultSchema>;

export const MultiDimAssessmentProfileSchema = z.object({
  age: z.number().int().min(18).max(55),
  maritalStatus: z.enum([
    'single',
    'married_partner_none',
    'married_partner_skilled',
    'married_with_children',
  ]),
  educationLevel: z.enum(['vocational', 'bachelor', 'master', 'doctorate']),
  targetDegreeLevel: z.enum(['vocational_trade', 'bachelor', 'master_gd', 'doctorate']).optional(),
  fieldCategory: z.enum([
    'it_ai',
    'healthcare',
    'teaching',
    'engineering_renewables',
    'trades_skilled',
    'business_finance',
    'media_design',
    'law_social',
  ]),
  specificJobOrMajor: z.string().optional(),
  techStackFocus: z.string().optional(),
  medicalLicenseStatus: z.string().optional(),
  highScoreWillingness: z.boolean().optional(),
  tradesSubCategory: z.string().optional(),
  businessCareerStrategy: z.string().optional(),
  experienceYears: z.number().min(0),
  certificationStatus: z.enum(['certified_trade_or_license', 'in_progress', 'none']),
  englishBand: z.enum(['none', 'competent', 'proficient', 'superior']),
  secondLanguage: z.enum(['none', 'de', 'fr', 'jp']),
  secondLanguageIntent: z.enum(['strict_english_only', 'willing_to_learn_b1', 'has_intermediate_foundation']).optional(),
  lonelinessTolerance: z.enum(['can_tolerate_solitude', 'afraid_of_isolation']).optional(),
  departureMotivations: z.array(z.string()).optional(),
  domesticCityTier: z.enum(['tier1_megacity', 'new_tier1', 'tier2_tier3', 'tier4_tier5_county']).optional(),
  budgetTier: z.enum(['low_10_25', 'medium_30_50', 'high_50_plus']),
  pathwayPreference: z.enum([
    'direct_job',
    'study_psw',
    'trade_skilled',
    'work_and_learn',
  ]),
  corePriority: z.enum(['fastest_pr', 'high_roi_salary', 'child_education_livable']),
  languageLearningWillingness: z.enum(['english_only', 'willing_to_learn_de_jp_fr']).optional(),
  corePriorityTradeOff: z.enum(['guaranteed_pr', 'high_roi_salary', 'family_low_cost_education']).optional(),
});

export type MultiDimAssessmentProfileSchemaType = z.infer<typeof MultiDimAssessmentProfileSchema>;
