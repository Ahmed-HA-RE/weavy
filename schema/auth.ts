import z from 'zod';

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
  password: z
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
    ),
});

export type SignUpFormData = z.infer<typeof authSchema>;

export const signInSchema = authSchema.pick({
  email: true,
  password: true,
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = authSchema.pick({ email: true });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: z
      .string({ error: 'Please confirm your password' })
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be at most 100 characters')
      .regex(
        /^(?=.*[A-Z]).*$/,
        'Password must contain at least one uppercase letter',
      )
      .regex(
        /^(?=.*[a-z]).*$/,
        'Password must contain at least one lowercase letter',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
