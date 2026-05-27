import DeleteAccountEmail from '@/emails/delete-account-email';
import { APP_NAME } from '@/lib/constants/app';
import { resendDomain, resend } from '@/lib/resend';

export const sendDeleteAccountEmail = async ({ userEmail, url }: { userEmail: string; url: string }) => {
  try {
    const { error } = await resend.emails.send({
      from: `${APP_NAME} <no-reply@${resendDomain}>`,
      to: userEmail,
      subject: 'Confirm your account deletion request',
      react: DeleteAccountEmail({ url }),
    });
    if (error) throw new Error(`Failed to send delete account email: ${error.message}`);
  } catch (error) {
    console.error('Error: ', error);
  }
};
