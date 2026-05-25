'use server';

import db from '@/lib/db';

export const validateUsername = async (username: string) => {
  try {
    // Check if the username is empty
    if (!username || username.trim() === '') {
      throw new Error('Username cannot be empty');
    }

    // Check if the username already exists in the database
    const existingUser = await db.user.findUnique({
      where: { name: username },
      select: { id: true },
    });

    if (existingUser) {
      throw new Error('Username is already taken');
    }

    // If the username is valid and not taken, return success
    return { success: true, message: '' };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage };
  }
};
