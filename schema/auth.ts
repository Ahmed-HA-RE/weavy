import z from 'zod';

export const authSchema = z.object({
  userName: z
    .string({ error: 'Username is required' })
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
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
