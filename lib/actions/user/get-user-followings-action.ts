'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const getUserFollowingsAction = async ({
  userName,
  page = 1,
  limit = 10,
}: {
  userName: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const loggedUser = session?.user;

    // Fetch the people this user is following, excluding those who have blocked or are blocked by the logged-in user and don't include the logged-in user
    const data = await db.user.findUnique({
      where: { name: userName },
      select: {
        following: {
          where: {
            ...(loggedUser && {
              following: {
                NOT: {
                  OR: [
                    {
                      id: loggedUser.id,
                    },
                    {
                      blocker: {
                        some: {
                          blockerId: loggedUser.id,
                        },
                      },
                    },
                    {
                      blocked: {
                        some: {
                          blockedId: loggedUser.id,
                        },
                      },
                    },
                  ],
                },
              },
            }),
          },

          select: {
            following: {
              select: {
                id: true,
                name: true,
                displayName: true,
                image: true,
                ...(loggedUser && {
                  followers: {
                    where: {
                      followerId: loggedUser.id,
                    },
                    select: {
                      followerId: true,
                    },
                    take: 1,
                  },
                }),
              },
            },
          },
          skip: (page - 1) * limit,
          take: limit,
        },
      },
    });

    const totalFollowings = await db.follow.count({
      where: {
        follower: {
          name: userName,
        },
        ...(loggedUser && {
          following: {
            NOT: {
              OR: [
                {
                  id: loggedUser.id,
                },
                {
                  blocker: {
                    some: {
                      blockerId: loggedUser.id,
                    },
                  },
                  blocked: {
                    some: {
                      blockedId: loggedUser.id,
                    },
                  },
                },
              ],
            },
          },
        }),
      },
    });

    const totalPages = Math.ceil(totalFollowings / limit);

    return {
      followings: data?.following.map((f) => f.following),
      totalPages,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage, followings: [], totalPages: 0 };
  }
};
