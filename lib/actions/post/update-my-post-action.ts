'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { type PostFormData, postSchema } from '@/schema/post';
import { headers } from 'next/headers';
import { UTApi } from 'uploadthing/server';

export const updateMyPostAction = async ({
  postId,
  data,
}: {
  postId: string;
  data: PostFormData;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to update the post');

    // Validate the input data
    const validatedData = postSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues
        .map((err) => err.message)
        .join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    // Fetch the existing post to get the old image key if exists
    const existingPost = await db.post.findFirst({
      where: { id: postId, userId: session.user.id },
      select: { imageKey: true },
    });

    const { content, image, imageKey } = validatedData.data;

    // Check if there is an image key then delete the old image from the storage if the user is updating the image
    if (existingPost?.imageKey) {
      const utapi = new UTApi();
      await utapi.deleteFiles(existingPost.imageKey);
    }

    const updatedPost = await db.post.update({
      where: { id: postId, userId: session.user.id },
      data: {
        content: content || null,
        image,
        imageKey,
      },
    });

    if (!updatedPost)
      throw new Error('Update failed: Post not found or unauthorized');

    return { success: true, message: 'Post updated successfully' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update the post';
    console.error('Error', errorMessage);

    return { success: false, message: errorMessage };
  }
};
