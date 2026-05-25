import z from 'zod';
import { authSchema } from './auth';

export const detailsSettingsSchema = z
  .object({
    name: authSchema.shape.userName,
    displayName: z
      .string()
      .max(50, 'Display Name must be at most 50 characters')
      .optional(),
    email: authSchema.shape.email,
    bio: z.string().max(160, 'Bio must be at most 160 characters').optional(),
    website: z.url({ message: 'Invalid URL' }).optional().or(z.literal('')),
    location: z
      .string()
      .max(100, 'Location must be at most 100 characters')
      .optional(),
  })
  .partial();

export type DetailsSettingsFormData = z.infer<typeof detailsSettingsSchema>;
