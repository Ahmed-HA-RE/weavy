'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { sendReportPostEmail } from '@/mail/send-report-post-email';
import { ReportPostFormData, reportPostSchema } from '@/schema/post';
import { headers } from 'next/headers';

export const reportPostAction = async (data: ReportPostFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to report this post');

    const validatedData = reportPostSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues
        .map((err) => err.message)
        .join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    const { message, blockUser, postId, reason, reporterId } =
      validatedData.data;

    if (reporterId !== session.user.id)
      throw new Error('Unauthorized to report this post');

    // Check if the user has already reported this post
    const existingReport = await db.report.findUnique({
      where: {
        reporterId_postId: {
          reporterId: session.user.id,
          postId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingReport) throw new Error('You have already reported this post.');

    // Create the report in the database and check if the user wanted to block the post author

    await db.$transaction(async (tx) => {
      const newReport = await tx.report.create({
        data: {
          reason,
          message,
          postId,
          reporterId,
        },
        select: {
          post: {
            select: {
              userId: true,
            },
          },
        },
      });
      if (blockUser) {
        await tx.block.create({
          data: {
            blockerId: session.user.id,
            blockedId: newReport.post.userId,
          },
        });
      }
    });

    // Send an email to the reporter for confirmation
    void sendReportPostEmail({
      reporterEmail: session.user.email,
      reporterName: session.user.name,
    });

    return { success: true, message: 'Thank you for reporting the post.' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to report the post.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};
