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

  const posts = await db.post.findMany({
    where: {
      user: {
        blocked: {
          none: {
            blockedId: loggedUser?.id || Prisma.skip,
          },
        },
        blocker: {
          none: {
            blockerId: loggedUser?.id || Prisma.skip,
          },
        },
      },
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
              blocked: {
                none: {
                  blockerId: loggedUser?.id || Prisma.skip,
                },
              },
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
                blocked: { none: { blockerId: loggedUser?.id || Prisma.skip } },
              },
            },
          },
          comments: {
            where: {
              user: {
                blocked: { none: { blockerId: loggedUser?.id || Prisma.skip } },
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
      reports: {
        where: {
          reporterId: loggedUser?.id || Prisma.skip,
        },

        select: {
          postId: true,
          reporterId: true,
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
