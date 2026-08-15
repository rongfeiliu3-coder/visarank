import { z } from 'zod';
import { CountryCodeSchema } from './country';

export const VisaCategorySchema = z.enum([
  'study',
  'work',
  'pr',
  'whv',
  'investor',
  'family',
]);

export const InvitationMechanismSchema = z.enum([
  'points_ranked',
  'threshold_pass',
  'state_nomination',
  'employer_sponsored',
  'first_come_first_served',
]);

export const VisaFeeSchema = z.object({
  local: z.string().min(1),
  cnyEstimate: z.string().min(1),
  amount: z.number().nonnegative().optional(),
  currency: z.string().min(3).max(5).optional(),
});

export const AdvisorVerdictSchema = z.object({
  highlightQuote: z.string().min(1),
  summary: z.string().min(1),
  fatalTraps: z.array(z.string()).min(1),
  idealFor: z.string().min(1),
  discouragedFor: z.string().min(1),
  officialLawQuote: z.string().optional(),
});

export const StatutoryPrerequisitesSchema = z.object({
  ageLimit: z.string(),
  languageBenchmark: z.string(),
  employerAccreditation: z.string(),
  healthAndCharacter: z.string(),
});

export const StatutoryOccupationSchema = z.object({
  name: z.string(),
  englishName: z.string(),
  code: z.string(),
  qualificationReq: z.string(),
  wageReq: z.string(),
  highlightTag: z.string(),
});

export const StatutoryOccupationGroupSchema = z.object({
  categoryName: z.string(),
  categoryIcon: z.string().optional(),
  occupations: z.array(StatutoryOccupationSchema),
});

export const LegalEvidenceTrailSchema = z.object({
  operationalManualBasis: z.string(),
  requiredEvidenceList: z.array(z.string()),
});

export const VisaSchema = z.object({
  id: z.string().min(1),
  countryCode: CountryCodeSchema,
  category: VisaCategorySchema,
  code: z.string().min(1),
  name: z.string().min(1),
  chineseName: z.string().min(1),
  summary: z.string(),
  description: z.string().optional(),
  thresholdScore: z.number().nonnegative(),
  maxScorePossible: z.number().positive().optional(),
  invitationMechanism: InvitationMechanismSchema,
  eoiRequired: z.boolean().default(false),
  jobOfferMandatory: z.boolean().default(false),
  ageLimit: z.number().int().positive().optional(),
  officialFee: VisaFeeSchema,
  effectivePeriod: z.string().min(1),
  estimatedProcessingTime: z.string().optional(),
  officialSourceUrl: z.string().url().optional(),
  lastVerifiedDate: z.string().optional(),
  wageRequirementNote: z.string().optional(),
  advisorVerdict: AdvisorVerdictSchema.optional(),
  prerequisites: StatutoryPrerequisitesSchema.optional(),
  occupationGroups: z.array(StatutoryOccupationGroupSchema).optional(),
  legalEvidence: LegalEvidenceTrailSchema.optional(),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type VisaSchemaType = z.infer<typeof VisaSchema>;
