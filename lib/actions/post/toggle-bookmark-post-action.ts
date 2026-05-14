'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const toggleBookmarkPostAction = async (postId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to bookmark this post');

    const userId = session.user.id;

    // Check if post exists
    const existingPost = await db.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        userId: true,
        bookmarks: {
          where: {
            userId,
            postId,
          },
        },
      },
    });

    if (!existingPost) throw new Error('Post not found');

    // Check if the user is trying to bookmark their own post
    if (existingPost.userId === userId) {
      throw new Error('You cannot bookmark your own post');
    }

    // Check if user bookmarked the post so we can toggle it
    const existingBookmark = existingPost.bookmarks.length > 0;

    if (existingBookmark) {
      // Remove bookmark
      await db.bookmark.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      // Add bookmark
      await db.bookmark.create({
        data: {
          userId,
          postId,
        },
      });
      return { success: true, message: 'Post bookmarked successfully' };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to bookmark this post';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
