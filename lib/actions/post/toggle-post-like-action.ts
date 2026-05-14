'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const togglePostLikeAction = async (postId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to perform this action');

    // Check if the post exists
    const post = await db.post.findUnique({
      where: { id: postId },
      select: { id: true, userId: true },
    });

    if (!post) throw new Error('Post not found');

    // Check if the user has already liked the post
    const existingLike = await db.like.findUnique({
      where: {
        userId_postId: {
          postId: post.id,
          userId: session.user.id,
        },
      },
    });

    if (existingLike) {
      // remove the like
      await db.like.delete({
        where: { id: existingLike.id },
      });
      return { success: true };
    } else {
      // add transaction to like the post and create a notification for the post owner.
      await db.$transaction(async (tx) => {
        const newLike = await tx.like.create({
          data: {
            postId: post.id,
            userId: session.user.id,
          },
        });
        if (post.userId === newLike.userId) return; // if the user is liking their own post, don't create a notification

        await tx.notification.create({
          data: {
            type: 'LIKE',
            receiverId: post.userId,
            senderId: newLike.userId,
            postId: post.id,
          },
        });
      });
    }
    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error', errorMessage);
    return { success: false };
  }
};
