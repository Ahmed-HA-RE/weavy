'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const followUserToggleAction = async (userId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    // Check if the user is trying to follow themselves
    if (session.user.id === userId) {
      throw new Error('You cannot follow yourself');
    }

    // Check if the target users exists and not already followed
    const existingFollow = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });

    // If user already follows the target user, unfollow them else follow them and send notification
    if (existingFollow) {
      await db.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return { success: true, message: 'User unfollowed successfully' };
    } else {
      await db.$transaction(async (tx) => {
        await tx.follow.create({
          data: {
            followerId: userId,
            followingId: session.user.id,
          },
        });
        await tx.notification.create({
          data: {
            type: 'FOLLOW',
            senderId: session.user.id,
            receiverId: userId,
          },
        });
      });
      revalidatePath('/'); // Revalidate the home page to update the followers count and the suggestions list
      return { success: true, message: 'User followed successfully' };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error toggling follow status:', errorMessage);
    return { success: false, message: errorMessage };
  }
};
