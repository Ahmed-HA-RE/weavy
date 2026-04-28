import { APP_NAME } from '@/lib/constants/app';
import resend, { resendDomain } from '@/lib/resend';
import ConfirmEmail from '@/emails/confirm-email';

export const sendConfirmEmail = async ({
  email,
  url,
}: {
  email: string;
  url: string;
}) => {
  await resend.emails.send({
    from: `${APP_NAME} <hello@${resendDomain}>`,
    to: email,
    subject: 'Confirm your email address',
    react: ConfirmEmail({ url }),
  });
};
