import type { CountryCode } from './country';

export type VisaCategory = 'study' | 'work' | 'pr' | 'whv' | 'investor' | 'family';

export type InvitationMechanism =
  | 'points_ranked'          // e.g. CA Express Entry CRS / AU EOI Points High-to-Low
  | 'threshold_pass'        // e.g. NZ SMC (Once reaching 6 pts with Job Offer, eligible to apply)
  | 'state_nomination'      // e.g. AU 190 / 491 / CA Provincial Nominee Program (PNP)
  | 'employer_sponsored'    // e.g. NZ Accredited Employer Work Visa (AEWV) / AU 482 / AU 186
  | 'first_come_first_served';

export interface VisaFee {
  local: string;
  cnyEstimate: string;
  amount?: number;
  currency?: string;
}

export interface AdvisorVerdict {
  highlightQuote: string; // 一句话毒舌总结 / 金句
  summary: string; // 深入大白话实战剖析
  fatalTraps: string[]; // 3~4 条致命避坑点与隐形门槛
  idealFor: string; // 最适合什么样的人（人群画像）
  discouragedFor: string; // 劝退什么样的人
  officialLawQuote?: string; // 原文法案公报精选引用
}

export interface StatutoryPrerequisites {
  ageLimit: string;           // e.g. "递交时年龄 < 56 周岁 (法定不可逾越硬红线)"
  languageBenchmark: string;  // e.g. "雅思 G 类 6.5 / PTE Academic 58 (或受认可全英文本硕免考豁免)"
  employerAccreditation: string; // e.g. "必须为移民局已认证雇主 (Accredited Employer)，全职 30h+/周"
  healthAndCharacter: string; // e.g. "全家无重大传染性疾病 (体检/胸透) 与近 10 年无犯罪记录证明 (Police Clearance)"
}

export interface StatutoryOccupation {
  name: string;               // e.g. "软件工程师"
  englishName: string;        // e.g. "Software Engineer"
  code: string;               // e.g. "ANZSCO 261312" / "NOC 21232" / "SOC 2136"
  qualificationReq: string;   // e.g. "华盛顿协议 BEng 认证 / NZQA Level 7+ 学士学位"
  wageReq: string;            // e.g. "法定中位数 $35.00/h (年薪 NZD $72,800+)"
  highlightTag: string;       // e.g. "Tier 1 境內/外直接递交 PR"
}

export interface StatutoryOccupationGroup {
  categoryName: string;       // e.g. "💻 计算机与前沿数字技术"
  categoryIcon?: string;
  occupations: StatutoryOccupation[];
}

export interface LegalEvidenceTrail {
  operationalManualBasis: string; // e.g. "依据新西兰移民局操作手册 INZ Operational Manual SR4.1 与 2026 最新公报"
  requiredEvidenceList: string[]; // e.g. ["NZQA 国际学历认证报告 (IQA)", "雇主全职合同及法定 Job Description", "行业执照注册证明", "税务局 IRD 完税流水证明"]
}

export interface Visa {
  id: string; // Unique slug identifier, e.g. 'nz_smc', 'au_189', 'ca_express_entry_fsw'
  countryCode: CountryCode;
  category: VisaCategory;
  code: string; // Short code, e.g. 'SMC', '189', 'EE-FSW', '190'
  name: string;
  chineseName: string;
  summary: string;
  description?: string;
  thresholdScore: number; // Minimal threshold required (e.g. NZ: 6, AU: 65, CA: 450)
  maxScorePossible?: number;
  invitationMechanism: InvitationMechanism;
  eoiRequired: boolean;
  jobOfferMandatory: boolean;
  ageLimit?: number; // Maximum ageLimit
  officialFee: VisaFee; // Official immigration filing fee & CNY estimate
  effectivePeriod: string; // Statutory policy effective period e.g. "2023.10 - 至今 (v2026.1)"
  estimatedProcessingTime?: string; // e.g. '6 - 9 Months'
  officialSourceUrl?: string; // Explicit legislative source direct link
  lastVerifiedDate?: string; // Latest manual/system verification date e.g. "2026-08"
  wageRequirementNote?: string; // Statutory wage basis e.g. "NZD $35.00/hr (Median Wage Benchmark)"
  advisorVerdict?: AdvisorVerdict; // Candid master verdict and real trap analysis
  prerequisites?: StatutoryPrerequisites; // Universal Statutory Pre-requisites
  occupationGroups?: StatutoryOccupationGroup[]; // Categorized Occupations with Standard Codes
  legalEvidence?: LegalEvidenceTrail; // Operational Manual Basis & Evidence Trail
  tags: string[];
  isActive: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

