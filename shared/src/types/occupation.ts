import type { CountryCode } from './country';

export type OccupationStandard = 'ANZSCO' | 'NOC_2021' | 'SOC_UK' | 'SSOC';

export interface OccupationSalary {
  amount: number;
  currency: string;
  period: 'hourly' | 'annual';
}

export interface ShortageOccupation {
  id: string;
  countryCode: CountryCode;
  standard: OccupationStandard;
  code: string; // e.g. "261313", "21232"
  title: string;
  chineseTitle: string;
  skillLevel: string; // e.g. "Skill Level 1", "TEER 0/1"
  tier?: string; // e.g. "Tier 1 - Straight to Residence", "Core Skills List"
  isGreenList?: boolean; // New Zealand Green List flag
  isRegionalDemand?: boolean;
  assessingAuthority?: string; // e.g. "ACS", "Engineers Australia", "WES"
  minQualificationLevel?: string;
  annualMedianSalary?: OccupationSalary;
  bonusPoints?: number;
  aliases?: string[];
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
