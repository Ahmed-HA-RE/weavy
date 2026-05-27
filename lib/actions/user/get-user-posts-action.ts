'use server';

import db from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma/client';

export const getUserPostsAction = async ({
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
    const userPosts = await db.post.findMany({
      where: {
        user: {
          name: userName,
        },
      },
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
      skip: (pageParam - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalPosts = await db.post.count({
      where: {
        user: {
          name: userName,
        },
      },
    });
    const totalPages = Math.ceil(totalPosts / limit);
    const nextPage = pageParam < totalPages ? pageParam + 1 : null;

    return { success: true, posts: userPosts, nextPage };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get user posts';
    console.error('Error: ', errorMessage);
    return { success: false, message: errorMessage, posts: [], nextPage: null };
  }
};
