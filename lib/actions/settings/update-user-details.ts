'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { DetailsSettingsFormData, detailsSettingsSchema } from '@/schema/settings';
import { headers } from 'next/headers';

export const updateUserDetails = async (data: DetailsSettingsFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) throw new Error('Unauthorized');

    const user = session.user;

    const validatedData = detailsSettingsSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues.map((err) => err.message).join(', ');
      throw new Error(errorMessages);
    }

    const { name, displayName, email, bio, website, location } = validatedData.data;

    // Update user details in the database
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name,
        displayName: displayName || null,
        email,
        bio: bio || null,
        website: `https://${website}` || null,
        location: location || null,
      },
    });
    if (!updatedUser) throw new Error('Failed to update user details');
    return { success: true, message: 'Updated successfully' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
