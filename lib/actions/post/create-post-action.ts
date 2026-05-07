'use server';

import { headers } from 'next/headers';
import { auth } from '../../auth';
import db from '../../db';
import { PostFormData, postSchema } from '@/schema/post';

export const createPostAction = async (data: PostFormData) => {
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
    return { success: true, message: 'Post created successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error', errorMessage);
    return { success: false, message: errorMessage };
  }
};
