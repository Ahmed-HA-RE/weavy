import ReportPostEmail from '@/emails/report-post-email';
import { APP_NAME } from '@/lib/constants/app';
import { resendDomain, resend } from '@/lib/resend';

export const sendReportPostEmail = async ({
  reporterEmail,
  reporterName,
}: {
  reporterEmail: string;
  reporterName: string;
}) => {
  try {
    const { error } = await resend.emails.send({
      from: `${APP_NAME} <report@${resendDomain}>`,
      to: reporterEmail,
      subject: 'We received your report about a post',
      react: ReportPostEmail({ reporterName }),
    });
    if (error)
      throw new Error(`Failed to send report post email: ${error.message}`);
  } catch (error) {
    console.error('Error: ', error);
  }
};
