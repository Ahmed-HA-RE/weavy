import ReportEmail from '@/emails/report-email';
import { APP_NAME } from '@/lib/constants/app';
import { resendDomain, resend } from '@/lib/resend';

export const sendReportEmail = async ({
  reporterEmail,
  reporterName,
  reportedName,
  type,
}: {
  reporterEmail: string;
  reporterName: string;
  reportedName?: string;
  type: 'POST' | 'USER';
}) => {
  const subject =
    type === 'POST'
      ? 'We received your report about a post'
      : `We received your report about ${reportedName}`;

  try {
    const { error } = await resend.emails.send({
      from: `${APP_NAME} <report@${resendDomain}>`,
      to: reporterEmail,
      subject,
      react: ReportEmail({ reporterName, type, reportedName }),
    });
    if (error)
      throw new Error(`Failed to send report post email: ${error.message}`);
  } catch (error) {
    console.error('Error: ', error);
  }
};
