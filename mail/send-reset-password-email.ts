import { APP_NAME } from '@/lib/constants/app';
import resend, { resendDomain } from '@/lib/resend';
import ResetPassword from '@/emails/reset-password';

export const sendResetPasswordEmail = async ({
  email,
  url,
}: {
  email: string;
  url: string;
}) => {
  await resend.emails.send({
    from: `${APP_NAME} <hello@${resendDomain}>`,
    to: email,
    subject: 'Reset your password',
    react: ResetPassword({ url }),
  });
};
