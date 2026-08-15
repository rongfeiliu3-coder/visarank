import { z } from 'zod';

export const CountryCodeSchema = z.string().min(2).max(10);

export const PolicyStatusSchema = z.enum(['active', 'beta', 'maintenance', 'deprecated']);

export const CountrySchema = z.object({
  code: CountryCodeSchema,
  name: z.string().min(1),
  nativeName: z.string().min(1),
  flag: z.string(),
  currency: z.string().min(3).max(5),
  officialImmigrationUrl: z.string().url(),
  description: z.string(),
  policyStatus: PolicyStatusSchema,
  lastPolicyUpdate: z.string(),
  supportedVisaCount: z.number().int().nonnegative().optional(),
  highlightBadges: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type CountrySchemaType = z.infer<typeof CountrySchema>;
