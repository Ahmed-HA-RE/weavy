'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { sendReportEmail } from '@/mail/send-report-email';
import { ReportUserFormData, reportUserSchema } from '@/schema/user';
import { headers } from 'next/headers';

export const reportUserAction = async (data: ReportUserFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) throw new Error('Unauthorized to report user');

    const validateData = reportUserSchema.safeParse(data);

    if (!validateData.success) {
      const errorMessage = validateData.error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new Error(errorMessage);
    }

    const { blockUser, reason, reportedId, message } = validateData.data;

    // Create a new report, check if the user want to block the reported user, and send an email to the reporter user
    const res = await db.$transaction(async (tx) => {
      const newReport = await tx.reportUser.create({
        data: {
          reason,
          message,
          reporterId: user.id,
          reportedId,
        },
        include: {
          reported: {
            select: {
              name: true,
            },
          },
          reporter: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      if (!blockUser) return newReport;

      await tx.block.create({
        data: {
          blockerId: newReport.reporterId,
          blockedId: reportedId,
        },
      });
      return newReport;
    });

    void sendReportEmail({
      type: 'USER',
      reporterEmail: res.reporter.email,
      reporterName: res.reporter.name,
      reportedName: res.reported.name,
    });

    return { success: true, message: 'User reported successfully' };
  } catch (error) {
    console.error('Error: ', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to report user';
    return { success: false, message: errorMessage };
  }
};
