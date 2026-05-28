'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const addComment = async ({ postId, content }: { postId: string; content: string }) => {
  try {
    const [session, existingPost] = await Promise.all([
      auth.api.getSession({
        headers: await headers(),
      }),
      // Check if the post exists
      db.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          userId: true,
          user: {
            select: {
              muteComments: true,
            },
          },
        },
      }),
    ]);
    if (!session) throw new Error('Unauthorized to add a comment');

    if (!existingPost) throw new Error('Post not found');

    // Create the comment and send a notification to the post owner if the commenter is not the post owner
    const comment = await db.$transaction(async (tx) => {
      const newComment = await tx.comment.create({
        data: {
          content,
          postId,
          userId: session.user.id,
        },
        include: {
          user: {
            select: {
              muteComments: true,
            },
          },
        },
      });
      if (session.user.id === existingPost.userId) return newComment;
      // Only send a notification if the post owner has not muted comment notifications
      if (existingPost.user.muteComments) return newComment;

      await tx.notification.create({
        data: {
          type: 'COMMENT',
          receiverId: existingPost.userId,
          senderId: session.user.id,
          postId,
          commentId: newComment.id,
        },
      });
      return newComment;
    });

    return { success: true, message: 'Comment added successfully', comment };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to add comment';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
