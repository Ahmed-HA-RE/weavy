'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const unblockUserAction = async (blockedUserId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to perform this action');

    const userId = session.user.id;

    // Perform the unblock operation in the database
    await db.block.delete({
      where: {
        blockerId_blockedId: {
          blockerId: userId,
          blockedId: blockedUserId,
        },
      },
    });
    return { success: true, message: 'User unblocked successfully' };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, message };
  }
};
