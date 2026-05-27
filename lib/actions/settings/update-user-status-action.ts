'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { USER_STATUS } from '@/lib/generated/prisma/enums';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const updateUserStatusAction = async (status: USER_STATUS) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized');

    const user = session.user;

    await db.user.update({
      where: { id: user.id },
      data: {
        status,
      },
    });
    revalidatePath('/settings'); // Purge cache to update status
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
