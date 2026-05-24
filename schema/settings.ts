import z from 'zod';
import { authSchema } from './auth';

export const detailsSettingsSchema = z.object({
  name: authSchema.shape.userName,
  displayName: authSchema.shape.userName.optional().nullable(),
  email: authSchema.shape.email,
  bio: z.string().max(160, 'Bio must be at most 160 characters').nullable(),
  website: z.url({ message: 'Invalid URL' }).nullable(),
  location: z
    .string()
    .max(100, 'Location must be at most 100 characters')
    .nullable(),
});

export type DetailsSettingsFormData = z.input<typeof detailsSettingsSchema>;
