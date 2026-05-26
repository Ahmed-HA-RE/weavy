import ChangeEmail from '@/emails/change-email';
import { APP_NAME } from '@/lib/constants/app';
import { resend, resendDomain } from '@/lib/resend';

export const sendChangeEmail = async ({
  callbackUrl,
  newEmail,
  currentEmail,
}: {
  callbackUrl: string;
  newEmail: string;
  currentEmail: string;
}) => {
  void resend.emails.send({
    from: `${APP_NAME} <hello@${resendDomain}>`,
    to: currentEmail,
    subject: 'Confirm your identity to change email address',
    react: ChangeEmail({ callbackUrl, newEmail }),
  });
};
