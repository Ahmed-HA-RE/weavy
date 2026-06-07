import ConfirmationTicketEmail from '@/emails/confirmation-ticket-email';
import { APP_NAME } from '@/lib/constants/app';
import { resend, resendDomain } from '@/lib/resend';

export const sendConfirmationTicketEmail = async ({
  senderName,
  senderEmail,
  subject,
}: {
  senderName: string;
  senderEmail: string;
  subject: string;
}) => {
  try {
    const { error } = await resend.emails.send({
      from: `${APP_NAME} <support@${resendDomain}>`,
      to: senderEmail,
      subject: 'Support Ticket Received',
      react: ConfirmationTicketEmail({ name: senderName, subject }),
    });
    if (error)
      throw new Error(`Failed to send support ticket email: ${error.message}`);
  } catch (error) {
    console.error('Error: ', error);
  }
};
