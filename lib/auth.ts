import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import db from './db';
import ConfirmEmail from '@/emails/confirm-email';
import resend from './resend';
import { APP_NAME } from './constants/app';

const resendDomain = process.env.RESEND_DOMAIN;

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: `${APP_NAME} <hello@${resendDomain}>`,
          to: user.email,
          subject: 'Confirm your email address',
          react: ConfirmEmail({ url }),
        });
        console.log(data, error);
      } catch (error) {
        console.error('Error: ', error);
      }
    },

    expiresIn: 1,
  },

  plugins: [nextCookies()],
});
