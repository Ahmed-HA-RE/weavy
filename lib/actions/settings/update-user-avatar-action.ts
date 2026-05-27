'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';
import { UTApi } from 'uploadthing/server';

export const updateUserAvatarAction = async ({ url, key }: { url: string; key: string }) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) throw new Error('Unauthorized to update avatar');

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        imageKey: true,
      },
    });

    if (!user) throw new Error('Unauthorized to update avatar');

    const utp = new UTApi();
    await Promise.all([
      // If user has an existing avatar, delete it from storage
      user.imageKey && utp.deleteFiles([user.imageKey]),
      // Update user's avatar in the database and remove old avatar from storage if it exists
      await db.user.update({
        where: { id: user.id },
        data: {
          image: url,
          imageKey: key,
        },
      }),
    ]);

    return { success: true, message: 'Avatar updated successfully' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    console.error('Error updating avatar:', errorMessage);
    return { success: false, message: errorMessage };
  }
};
