'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const getMyNotificationsAction = async ({
  limit = 10,
  pageParam = 1,
}: {
  limit?: number;
  pageParam: number;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized');

    const notifications = await db.notification.findMany({
      where: {
        receiverId: session.user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            displayName: true,
            image: true,
          },
        },
        comment: {
          select: {
            content: true,
          },
        },
        follow: {
          select: {
            follower: {
              select: {
                name: true,
              },
            },
          },
        },
        post: {
          select: {
            likes: {
              where: {
                userId: session.user.id,
              },
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            image: true,
            content: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: (pageParam - 1) * limit,
    });

    const nextPage = notifications.length === limit ? pageParam + 1 : null;

    return { success: true, notifications, nextPage };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch notifications.';
    console.error('Error: ', error);
    return { success: false, message: errorMessage };
  }
};
