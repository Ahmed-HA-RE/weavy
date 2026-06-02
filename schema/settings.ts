import z from 'zod';
import { authSchema, passwordSchema } from './auth';

export const detailsSettingsSchema = z.object({
  name: authSchema.shape.userName,
  displayName: z.string().max(50, 'Display Name must be at most 50 characters').optional(),
  bio: z.string().max(160, 'Bio must be at most 160 characters').optional(),
  website: z.string().max(100, 'Website must be at most 100 characters').optional().or(z.literal('')),
  location: z.string().max(100, 'Location must be at most 100 characters').optional(),
});

export type DetailsSettingsFormData = z.infer<typeof detailsSettingsSchema>;

export const dangerZoneSettingsSchema = z.object({
  firstConfirmation: z.boolean(),
  secondConfirmation: z.boolean(),
  thirdConfirmation: z.boolean(),
});

export type DangerZoneSettingsFormData = z.input<typeof dangerZoneSettingsSchema>;

export const verifyPasswordSchema = z.object({
  password: passwordSchema,
});

export type VerifyPasswordFormData = z.infer<typeof verifyPasswordSchema>;

export const twoFactorOTPSchema = z.object({
  otp: z.string().min(6, 'Please enter the 6-digit OTP').max(6, 'OTP must not exceed 6 digits'),
});

export type TwoFactorOTPFormData = z.infer<typeof twoFactorOTPSchema>;
