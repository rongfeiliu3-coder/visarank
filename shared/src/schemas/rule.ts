import { z } from 'zod';

export const RuleCategorySchema = z.enum([
  'age',
  'education',
  'experience_overseas',
  'experience_local',
  'language',
  'job_offer',
  'partner',
  'stem_specialist',
  'regional_bonus',
  'state_nomination',
  'occupational_registration',
  'salary_benchmark',
  'mandatory_threshold',
  'general',
]);

export const CapStrategySchema = z.enum([
  'max_of',
  'sum_up_to_max',
  'exclusive_choice',
]);

export const JsonLogicRuleSchema = z.record(z.any());

export const PolicyRuleSchema = z.object({
  id: z.string().min(1),
  visaId: z.string().min(1),
  category: RuleCategorySchema,
  code: z.string().min(1),
  name: z.string().min(1),
  chineseName: z.string().min(1),
  description: z.string(),
  logic: JsonLogicRuleSchema,
  points: z.number().default(0),
  scoreFormula: z.string().optional(),
  isMandatory: z.boolean().default(false),
  capGroup: z.string().optional(),
  capStrategy: CapStrategySchema.optional(),
  capLimit: z.number().nonnegative().optional(),
  orderIndex: z.number().int().default(0),
  effectiveFrom: z.string(),
  effectiveTo: z.string().nullable().optional(),
  version: z.string().default('1.0'),
  officialClauseRef: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const CapGroupSummarySchema = z.object({
  capGroup: z.string(),
  strategy: CapStrategySchema,
  capLimit: z.number(),
  rawPoints: z.number(),
  appliedPoints: z.number(),
  contributingRuleCodes: z.array(z.string()),
  selectedRuleCode: z.string().optional(),
});

export type PolicyRuleSchemaType = z.infer<typeof PolicyRuleSchema>;
export type CapGroupSummarySchemaType = z.infer<typeof CapGroupSummarySchema>;
