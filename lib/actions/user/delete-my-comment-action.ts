'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const deleteMyCommentAction = async ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to delete this comment');

    // Get the comment from the database and check if it belongs to the logged-in user and if it exists
    const comment = await db.comment.findUnique({
      where: { id: commentId, userId: session.user.id, postId },
      select: { id: true, userId: true },
    });

    if (!comment) throw new Error('Comment not found');
    if (comment.userId !== session.user.id)
      throw new Error('Unauthorized to delete this comment');

    // Delete the comment from the database
    await db.comment.delete({
      where: { id: commentId },
    });

    revalidatePath('/');
    return { success: true, message: 'Comment deleted successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to delete your comment';
    console.error('Error', errorMessage);
    return { success: false, message: errorMessage };
  }
};
