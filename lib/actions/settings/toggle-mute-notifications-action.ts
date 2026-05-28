'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const toggleMuteNotificationsAction = async ({
  muteFollows,
  muteComments,
  muteLikes,
}: {
  muteFollows?: boolean;
  muteComments?: boolean;
  muteLikes?: boolean;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('User not authenticated');

    const user = session.user;

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        muteFollows,
        muteComments,
        muteLikes,
      },
    });
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
