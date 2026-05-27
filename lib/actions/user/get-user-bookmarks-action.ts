'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma/client';
import { headers } from 'next/headers';

export const getUserBookmarksAction = async ({
  pageParam,
  limit = 10,
  userName,
  loggedUserId,
}: {
  pageParam: number;
  limit?: number;
  userName: string;
  loggedUserId?: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.name !== userName) throw new Error('Unauthorized');

    const bookmarks = await db.bookmark.findMany({
      where: {
        user: {
          name: userName,
        },
      },
      include: {
        post: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                displayName: true,
                image: true,
                role: true,
                status: true,
                followers: {
                  where: {
                    followerId: loggedUserId || Prisma.skip,
                  },
                },
              },
            },
            reports: {
              where: {
                reporterId: loggedUserId || Prisma.skip,
              },
            },
            likes: {
              select: {
                userId: true,
                postId: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            bookmarks: {
              where: {
                userId: loggedUserId || Prisma.skip,
              },
            },
          },
        },
      },
      skip: (pageParam - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalBookmarks = await db.bookmark.count({
      where: {
        user: {
          name: userName,
        },
      },
    });

    const totalPages = Math.ceil(totalBookmarks / limit);
    const nextPage = pageParam < totalPages ? pageParam + 1 : null;

    return { success: true, bookmarks, nextPage };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred while fetching user bookmarks.';
    console.error('Error: ', errorMessage);
    return {
      success: false,
      error: errorMessage,
      bookmarks: [],
      nextPage: null,
    };
  }
};
