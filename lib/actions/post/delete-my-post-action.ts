'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const deleteMyPostAction = async (postId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to delete the post');

    // Delete the post from the database
    const post = await db.post.delete({
      where: {
        id: postId,
        userId: session.user.id,
      },
    });

    if (!post) throw new Error('Post not found or you are not the owner');

    revalidatePath('/'); // purge the cache
    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to delete the post';
    console.error('Error', errorMessage);
    return { success: false, message: errorMessage };
  }
};
