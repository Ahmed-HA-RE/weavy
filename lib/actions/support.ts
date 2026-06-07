'use server';

import {
  SupportSubmitTicketFormData,
  supportSubmitTicketSchema,
} from '@/schema/support';
import { auth } from '../auth';
import { headers } from 'next/headers';
import { ratelimit } from '../upstash-rateLimit';
import { sendConfirmationTicketEmail } from '@/mail/send-confirmation-ticket-email';
import { sendSupportTicketEmail } from '@/mail/send-support-ticket-email';

export const submitSupportTicket = async (
  data: SupportSubmitTicketFormData,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session)
      throw new Error('You must be logged in to submit a support ticket.');

    // Check if the user is submitting too many tickets (rate limiting)
    const identifier = session.user.id;
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      throw new Error(
        'You are submitting tickets too quickly. Please try again later.',
      );
    }

    const validatedData = supportSubmitTicketSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues
        .map((err) => err.message)
        .join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    const { name, email, subject, description } = validatedData.data;

    // Send 2 emails: one to support team and one to the user as confirmation
    void sendConfirmationTicketEmail({
      senderName: name,
      senderEmail: email,
      subject,
    });

    void sendSupportTicketEmail({
      senderName: name,
      senderEmail: email,
      subject,
      description,
    });
    return { success: true, message: 'Support ticket submitted successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error submitting support ticket:', errorMessage);
    return { success: false, message: errorMessage };
  }
};
