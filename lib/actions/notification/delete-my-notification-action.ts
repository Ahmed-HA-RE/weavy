'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const deleteMyNotificationAction = async (notificationId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to perform this action');

    // Check if the notification exists and belongs to the user
    const notification = await db.notification.findUnique({
      where: { id: notificationId, receiverId: session.user.id },
    });

    if (!notification)
      throw new Error(
        'Notification not found or you do not have permission to delete it',
      );

    await db.notification.delete({
      where: { id: notificationId },
    });

    return { success: true, message: 'Notification deleted successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Faild to delete notification';
    console.error('Error: ', error);
    return { success: false, message: errorMessage };
  }
};
