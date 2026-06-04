'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma/client';
import { headers } from 'next/headers';

export const getPostsAction = async ({
  pageParam,
  limit = 5,
}: {
  pageParam: number;
  limit?: number;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const loggedUser = session?.user;

  const blockQuery = loggedUser
    ? {
        blocked: {
          none: {
            blockedId: loggedUser.id,
          },
        },
        blocker: {
          none: {
            blockerId: loggedUser.id,
          },
        },
      }
    : {};

  const posts = await db.post.findMany({
    where: {
      ...(loggedUser && {
        user: {
          ...blockQuery,
        },

        reports: {
          none: {
            reporterId: loggedUser?.id || Prisma.skip,
          },
        },
      }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      content: true,
      image: true,
      imageKey: true,
      createdAt: true,
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
              followerId: loggedUser?.id || Prisma.skip,
            },
          },
        },
      },

      comments: {
        ...(loggedUser && {
          where: {
            user: {
              ...blockQuery,
            },
          },
        }),
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              displayName: true,
              image: true,
              role: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
      _count: {
        select: {
          likes: {
            where: {
              user: {
                ...blockQuery,
              },
            },
          },
          comments: {
            where: {
              user: {
                ...blockQuery,
              },
            },
          },
        },
      },
      likes: {
        where: {
          userId: loggedUser?.id || Prisma.skip,
        },
        select: {
          postId: true,
          userId: true,
        },
      },

      bookmarks: {
        ...(loggedUser && {
          where: {
            userId: loggedUser.id,
          },
          select: {
            postId: true,
            userId: true,
          },
        }),
      },
    },
    skip: (pageParam - 1) * limit,
    take: limit, // Load 10 posts per page
  });
  const nextPage = posts.length === limit ? pageParam + 1 : null;

  return {
    posts,
    nextPage,
  };
};
