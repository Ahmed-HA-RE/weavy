import { APP_NAME } from '@/lib/constants/app';
import { resend, resendDomain } from '@/lib/resend';

const companyEmail = process.env.COMPANY_EMAIL!;
console.log(companyEmail);

export const sendSupportTicketEmail = async ({
  senderName,
  senderEmail,
  subject,
  description,
}: {
  senderName: string;
  senderEmail: string;
  subject: string;
  description: string;
}) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Support Ticket</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Inter,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7;">

                <!-- Header -->
                <tr>
                  <td style="background-color:#4f46e5;padding:32px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                      📩 New Support Ticket
                    </h1>
                    <p style="margin:8px 0 0;color:#c7d2fe;font-size:14px;">
                      Someone submitted a ticket via ${APP_NAME}
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:36px 40px;">

                    <!-- Sender details -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:24px;">
                      <tr>
                        <td style="padding:20px 24px;">
                          <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">
                            Sender Details
                          </p>
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding:4px 0;font-size:14px;color:#64748b;width:80px;">Name:</td>
                              <td style="padding:4px 0;font-size:14px;color:#0f172a;font-weight:600;">${senderName}</td>
                            </tr>
                            <tr>
                              <td style="padding:4px 0;font-size:14px;color:#64748b;">Email:</td>
                              <td style="padding:4px 0;font-size:14px;">
                                <a href="mailto:${senderEmail}" style="color:#4f46e5;text-decoration:none;font-weight:600;">${senderEmail}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Subject -->
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">
                      Subject
                    </p>
                    <p style="margin:0 0 24px;font-size:16px;font-weight:600;color:#0f172a;">
                      ${subject}
                    </p>

                    <!-- Description -->
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">
                      Description
                    </p>
                    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px 24px;">
                      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap;">
                        ${description}
                      </p>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="border-top:1px solid #f1f5f9;padding:20px 40px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#94a3b8;">
                      &copy; ${APP_NAME} ${new Date().getFullYear()}. This is an automated notification.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `${APP_NAME} <support@${resendDomain}>`,
      to: companyEmail,
      replyTo: senderEmail,
      subject: `[Support Ticket] ${subject}`,
      html,
    });
    if (error)
      throw new Error(`Failed to send support ticket email: ${error.message}`);
  } catch (error) {
    console.error('Error: ', error);
  }
};
