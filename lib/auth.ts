import { APIError, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import db from './db';
import { sendConfirmEmail } from '@/mail/send-confirm-email';
import { sendResetPasswordEmail } from '@/mail/send-reset-password-email';
import {
  lastLoginMethod,
  customSession,
  captcha,
  twoFactor,
} from 'better-auth/plugins';
import { USER_ROLE, USER_STATUS } from './generated/prisma/enums';
import { sendChangeEmail } from '@/mail/send-change-email';
import { sendDeleteAccountEmail } from '@/mail/send-delete-account-email';
import { createAuthMiddleware } from 'better-auth/api';
import { sendTwoFactorOTPEmail } from '@/mail/send-two-factor-otp';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  appName: 'Weavy',

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const accessDeniedQuery = ctx.query?.error === 'access_denied';
      if (accessDeniedQuery) {
        ctx.redirect('/sign-in');
      }
    }),
  },

  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
        void sendChangeEmail({
          callbackUrl: url,
          newEmail,
          currentEmail: user.email,
        });
      },
    },
    deleteUser: {
      enabled: true,
      deleteTokenExpiresIn: 3600, // 1 hr
      sendDeleteAccountVerification: async ({
        user, // The user object
        url, // The auto-generated URL for deletion
      }) => {
        void sendDeleteAccountEmail({
          userEmail: user.email,
          url,
        });
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Format the username to be lowercase and trimmed
          user.name = user.name.trim().toLowerCase().replace(/\s+/g, '_');

          // Check if the username already exists before creating the user
          const existingUsername = await db.user.findUnique({
            where: { name: user.name },
          });
          if (existingUsername) {
            throw new APIError('BAD_REQUEST', {
              message:
                'Username already exists. Please choose a different one.',
            });
          }
        },
      },
    },
  },

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
          role: fetchedUser?.role || USER_ROLE.USER,
          status: fetchedUser?.status || USER_STATUS.ONLINE,
          displayName: fetchedUser?.displayName,
          twoFactorEnabled: fetchedUser?.twoFactorEnabled || false,
        },
        session,
      };
    }),

    captcha({
      provider: 'google-recaptcha',
      secretKey: process.env.GOOGLE_RECAPTCHA_SECRET!,
      endpoints: ['/sign-up/email', '/sign-in/email'],
    }),

    twoFactor({
      backupCodeOptions: {
        length: 6,
        amount: 8,
      },
      otpOptions: {
        digits: 6,
        allowedAttempts: 5,
        sendOTP: async ({ user, otp }) => {
          void sendTwoFactorOTPEmail({
            email: user.email,
            otp,
          });
        },
        period: 15, // 15 minutes
      },
    }),
  ],
});
