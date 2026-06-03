import z from 'zod';

export const passwordSchema = z
  .string({ error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password must be at most 100 characters')
  .regex(
    /^(?=.*[A-Z]).*$/,
    'Password must contain at least one uppercase letter',
  )
  .regex(
    /^(?=.*[a-z]).*$/,
    'Password must contain at least one lowercase letter',
  );

export const authSchema = z.object({
  userName: z
    .string({ error: 'Username is required' })
    .min(5, 'Username must be at least 5 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    )
    .transform((name) => name.trim().toLowerCase()),
  email: z.email({ error: 'Invalid email address' }),
  password: passwordSchema,
  recaptchaToken: z
    .string({ error: 'Please complete the reCAPTCHA' })
    .nullable(),
});

export type SignUpFormData = z.infer<typeof authSchema>;

export const signInSchema = authSchema.pick({
  email: true,
  password: true,
  recaptchaToken: true,
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = authSchema.pick({ email: true });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const setPasswordSchema = resetPasswordSchema;

export type SetPasswordFormData = z.infer<typeof setPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const twoFactorBackupCodeSchema = z.object({
  code: z
    .string()
    .min(7, 'Please enter the backup code')
    .max(7, 'Backup code must be 7 characters'),
  trustDevice: z.boolean().default(false),
});

export type TwoFactorBackupCodeFormData = z.input<
  typeof twoFactorBackupCodeSchema
>;
