export type CountryCode = 'NZ' | 'AU' | 'CA' | 'UK' | 'SG' | 'DE' | 'JP' | 'IE' | 'FR' | 'NL' | 'SE' | 'DK' | 'FI' | 'US' | (string & {});

export type PolicyStatus = 'active' | 'beta' | 'maintenance' | 'deprecated';

export interface Country {
  code: CountryCode;
  name: string;
  nativeName: string;
  flag: string; // Emoji or SVG path
  currency: string;
  officialImmigrationUrl: string;
  officialSourceUrl?: string; // Explicit legislative source direct link
  lastVerifiedDate?: string; // Latest manual/system verification date e.g. "2026-08"
  description: string;
  policyStatus: PolicyStatus;
  lastPolicyUpdate: string; // ISO date string e.g. "2026-06-01"
  supportedVisaCount?: number;
  highlightBadges?: string[];
  createdAt?: string;
  updatedAt?: string;
}
