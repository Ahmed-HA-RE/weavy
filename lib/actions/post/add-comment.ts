'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const addComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
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
      });
      if (session.user.id === existingPost.userId) return newComment;

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

    revalidatePath('/'); // Revalidate the home page to show the new comment
    return { success: true, message: 'Comment added successfully', comment };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to add comment';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
