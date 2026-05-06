'use server';

import { headers } from 'next/headers';
import { auth } from '../../auth';
import db from '../../db';
import { revalidatePath } from 'next/cache';
import { CreatePostFormData, postSchema } from '@/schema/post';

export const createPostAction = async (data: CreatePostFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized');

    const validatedData = postSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessage = validatedData.error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new Error(errorMessage);
    }
    const { content, image, imageKey } = validatedData.data;
    // Create the post in the database
    await db.post.create({
      data: {
        content: content || null,
        image,
        imageKey,
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
