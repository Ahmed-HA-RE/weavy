import { APP_NAME } from '@/lib/constants/app';
import { resend, resendDomain } from '@/lib/resend';
import TwoFactorOTPEmail from '@/emails/two-factor-otp-email';

export const sendTwoFactorOTPEmail = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  await resend.emails.send({
    from: `${APP_NAME} <hello@${resendDomain}>`,
    to: email,
    subject: 'Your Two-Factor Authentication Code',
    react: TwoFactorOTPEmail({ otp }),
  });
};
