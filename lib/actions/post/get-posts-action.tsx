'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
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
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      content: true,
      image: true,
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
              followerId: loggedUser?.id,
            },
          },
        },
      },
      comments: {
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
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      likes: {
        where: {
          userId: loggedUser?.id,
        },
        select: {
          postId: true,
          userId: true,
        },
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
