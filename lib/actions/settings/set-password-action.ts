'use server';

import { auth } from '@/lib/auth';
import { SetPasswordFormData, setPasswordSchema } from '@/schema/auth';
import { headers } from 'next/headers';

export const setPasswordAction = async (data: SetPasswordFormData) => {
  try {
    const headersReq = await headers();
    const session = await auth.api.getSession({
      headers: headersReq,
    });

    if (!session) throw new Error('Unauthorized');

    const validatedData = setPasswordSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues.map((err) => err.message).join(', ');
      throw new Error(errorMessages);
    }

    const { password: newPassword } = validatedData.data;

    const { status } = await auth.api.setPassword({
      body: {
        newPassword,
      },
      headers: headersReq,
    });
    if (status === false) {
      return { success: false, message: 'Failed to set password. Please try again.' };
    } else {
      return { success: true, message: 'Password set successfully!' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
