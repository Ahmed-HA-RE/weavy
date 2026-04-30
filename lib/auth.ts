import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import db from './db';
import { sendConfirmEmail } from '@/mail/send-confirm-email';
import { sendResetPasswordEmail } from '@/mail/send-reset-password-email';
import { lastLoginMethod, customSession } from 'better-auth/plugins';
import { USER_ROLE, USER_STATUS } from './generated/prisma/enums';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void sendResetPasswordEmail({ email: user.email, url });
    },
    resetPasswordTokenExpiresIn: 7200, // 2 hours
    revokeSessionsOnPasswordReset: true,
  },

  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendConfirmEmail({ email: user.email, url });
    },

    expiresIn: 7200, // 2 hours in seconds
  },

  plugins: [
    nextCookies(),
    lastLoginMethod(),
    customSession(async ({ user, session }) => {
      const fetchedUser = await db.user.findUnique({
        where: { id: user.id },
      });
      return {
        user: {
          ...user,
          role: fetchedUser?.role as USER_ROLE,
          status: fetchedUser?.status as USER_STATUS,
        },
        session,
      };
    }),
  ],
});
