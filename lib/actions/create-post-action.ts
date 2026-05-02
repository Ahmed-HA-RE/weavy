'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';
import db from '../db';
import { revalidatePath } from 'next/cache';

export const createPostAction = async ({
  content,
  image,
}: {
  content: string;
  image?: string | null;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized');

    // Create the post in the database
    await db.post.create({
      data: {
        content,
        image,
        userId: session.user.id,
      },
    });

    revalidatePath('/'); // Revalidate the home page to show the new post
    return { success: true, message: 'Post created successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error', errorMessage);
    return { success: false, message: errorMessage };
  }
};
