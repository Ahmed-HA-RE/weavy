'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { type UpdatePostFormData, updatePostSchema } from '@/schema/post';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const updateMyPostAction = async ({
  postId,
  data,
}: {
  postId: string;
  data: UpdatePostFormData;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to update the post');

    // Validate the input data
    const validatedData = updatePostSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues
        .map((err) => err.message)
        .join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    const { content, image } = validatedData.data;

    // Later will add image upload functionality, for now we will just update the content of the post
    const updatedPost = await db.post.update({
      where: { id: postId, userId: session.user.id },
      data: {
        content,
        image,
      },
    });

    if (!updatedPost)
      throw new Error('Update failed: Post not found or unauthorized');

    revalidatePath('/'); // purge the cache for the home page to show the updated post
    return { success: true, message: 'Post updated successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update the post';
    console.error('Error', errorMessage);

    return { success: false, message: errorMessage };
  }
};
