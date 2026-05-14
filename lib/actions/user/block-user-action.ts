'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const blockUserAction = async (blockedUser: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session)
      throw new Error('User must be authenticated to block another user.');

    // Block the user and remove any existing follow relationships
    await db.$transaction(async (tx) => {
      const newBlock = await tx.block.create({
        data: {
          blockerId: session.user.id,
          blockedId: blockedUser,
        },
      });

      // Fetch the follow and check if the blocker is following the blocked user
      const follow = await tx.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: newBlock.blockerId,
            followingId: newBlock.blockedId,
          },
        },
        select: {
          followerId: true,
          followingId: true,
        },
      });

      if (!follow) return;

      await tx.follow.deleteMany({
        where: {
          OR: [
            {
              followerId: newBlock.blockerId,
              followingId: newBlock.blockedId,
            },
            {
              followerId: newBlock.blockedId,
              followingId: newBlock.blockerId,
            },
          ],
        },
      });
    });

    return { success: true, message: 'User blocked successfully.' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to block user';
    console.error('Error blocking user:', errorMessage);
    return { success: false, message: errorMessage };
  }
};
