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

    const loggedUser = session.user;

    // Block the user and remove any existing data that is relevant between the blocker and the blocked user, such as follows, likes, comments, etc...
    await db.$transaction(async (tx) => {
      // 1. Block the user
      const newBlock = await tx.block.create({
        data: {
          blockedId: blockedUser,
          blockerId: loggedUser.id,
        },
      });

      // 2. Remove follow relationships
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

      const swapCleanup = {
        OR: [
          {
            userId: newBlock.blockerId,
            post: { userId: newBlock.blockedId },
          },
          {
            userId: newBlock.blockedId,
            post: { userId: newBlock.blockerId },
          },
        ],
      };

      // 3. Remove likes
      await tx.like.deleteMany({
        where: swapCleanup,
      });

      // 4. Remove comments
      await tx.comment.deleteMany({
        where: swapCleanup,
      });

      // 5. Remove bookmarks
      await tx.bookmark.deleteMany({
        where: swapCleanup,
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
