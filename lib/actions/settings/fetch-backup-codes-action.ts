'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const fetchBackupCodesAction = async () => {
  try {
    const headerRes = await headers();

    const session = await auth.api.getSession({
      headers: headerRes,
    });

    if (!session) throw new Error('Unauthorized');

    const { backupCodes } = await auth.api.viewBackupCodes({
      body: {
        userId: session.user.id,
      },
    });

    return { success: true, backupCodes };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, message: errorMessage, backupCodes: [] as string[] };
  }
};
