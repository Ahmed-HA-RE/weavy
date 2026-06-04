'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma/client';
import { headers } from 'next/headers';

export const fetchBlockedUsersAction = async ({
  offset = 1,
  limit = 5,
  searchFilter,
}: {
  offset?: number;
  limit?: number;
  searchFilter?: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized');

    const userId = session.user.id;

    // If searchFilter is provided, include it in the query
    const searchQuery: Prisma.BlockWhereInput = searchFilter
      ? {
          OR: [
            {
              blocked: {
                name: { contains: searchFilter, mode: 'insensitive' },
              },
            },
            {
              blocked: {
                email: { contains: searchFilter, mode: 'insensitive' },
              },
            },
          ],
        }
      : {};

    const [blockedUsers, totalBlockedCount] = await Promise.all([
      db.block.findMany({
        where: { ...searchQuery, blockerId: userId },
        select: {
          blocked: {
            select: {
              id: true,
              name: true,
              displayName: true,
              image: true,
            },
          },
        },
        skip: (offset - 1) * limit,
        take: limit,
      }),
      db.block.count({
        where: { ...searchQuery, blockerId: userId },
      }),
    ]);

    const totalPages = Math.ceil(totalBlockedCount / limit);

    return { success: true, blockedUsers, totalPages };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message, blockedUsers: [], totalPages: 0 };
  }
};
