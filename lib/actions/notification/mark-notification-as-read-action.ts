'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const markNotificationAsReadAction = async (notificationId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized');

    // Check if the notification belongs to the user and exists
    const notification = await db.notification.findFirst({
      where: {
        id: notificationId,
        receiverId: session.user.id,
      },
      select: { id: true },
    });

    if (!notification)
      throw new Error('Notification not found or you do not have permission.');

    await db.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });

    return { success: true, message: 'Marked as read.' };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to mark notification as read.';
    console.error('Error: ', error);
    return { success: false, message: errorMessage };
  }
};
