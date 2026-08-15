import { z } from 'zod';
import { CountryCodeSchema } from './country';

export const OccupationStandardSchema = z.enum([
  'ANZSCO',
  'NOC_2021',
  'SOC_UK',
  'SSOC',
]);

export const OccupationSalarySchema = z.object({
  amount: z.number().positive(),
  currency: z.string().min(3).max(5),
  period: z.enum(['hourly', 'annual']),
});

export const ShortageOccupationSchema = z.object({
  id: z.string().min(1),
  countryCode: CountryCodeSchema,
  standard: OccupationStandardSchema,
  code: z.string().min(1),
  title: z.string().min(1),
  chineseTitle: z.string().min(1),
  skillLevel: z.string().min(1),
  tier: z.string().optional(),
  isGreenList: z.boolean().optional(),
  isRegionalDemand: z.boolean().optional(),
  assessingAuthority: z.string().optional(),
  minQualificationLevel: z.string().optional(),
  annualMedianSalary: OccupationSalarySchema.optional(),
  bonusPoints: z.number().nonnegative().optional(),
  aliases: z.array(z.string()).optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ShortageOccupationSchemaType = z.infer<typeof ShortageOccupationSchema>;
