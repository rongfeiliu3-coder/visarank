export type RuleCategory =
  | 'age'
  | 'education'
  | 'experience_overseas'
  | 'experience_local'
  | 'language'
  | 'job_offer'
  | 'partner'
  | 'stem_specialist'
  | 'regional_bonus'
  | 'state_nomination'
  | 'occupational_registration'
  | 'salary_benchmark'
  | 'mandatory_threshold'
  | 'general';

export type CapStrategy =
  | 'max_of'            // Pick the highest scoring item in this capGroup (e.g., NZ SMC 3-pillar choice)
  | 'sum_up_to_max'      // Sum items in this group but clamp at capLimit (e.g., AU experience cap)
  | 'exclusive_choice';  // Explicit mutually exclusive selection

/**
 * Standard JsonLogic syntax tree representation
 */
export type JsonLogicRule = Record<string, unknown>;

export interface PolicyRule {
  id: string;
  visaId: string;
  category: RuleCategory;
  code: string; // e.g. "NZ_SMC_QUAL_MASTER", "AU_GSM_AGE_25_32"
  name: string;
  chineseName: string;
  description: string;
  logic: JsonLogicRule; // JsonLogic JSON rule definition
  points: number; // Score granted when logic resolves to true
  scoreFormula?: string; // Optional dynamic score calculation formula
  isMandatory: boolean; // True if this is a hard prerequisite for eligibility
  capGroup?: string; // Group ID for capping / mutual exclusion
  capStrategy?: CapStrategy;
  capLimit?: number; // Maximum points allowed across the capGroup
  orderIndex: number; // Evaluation ordering index
  effectiveFrom: string; // ISO date string e.g. "2024-01-01"
  effectiveTo?: string | null;
  version: string; // e.g. "2026.1"
  officialClauseRef?: string; // Policy regulation reference (e.g., "Schedule 6D Part 1")
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CapGroupSummary {
  capGroup: string;
  strategy: CapStrategy;
  capLimit: number;
  rawPoints: number;
  appliedPoints: number;
  contributingRuleCodes: string[];
  selectedRuleCode?: string;
}
