'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { headers } from 'next/headers';

export const getUserFollowers = async ({
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

    // Fetch the followers of the specified user, excluding those who have blocked or are blocked by the logged-in user and dont include the logged in user
    const followers = await db.user.findUnique({
      where: { name: userName },
      select: {
        followers: {
          where: {
            ...(loggedUser && {
              follower: {
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
            follower: {
              select: {
                id: true,
                name: true,
                displayName: true,
                image: true,
              },
            },
          },
          skip: (page - 1) * limit,
          take: limit,
        },
      },
    });

    const totalFollowers = await db.follow.count({
      where: {
        following: {
          name: userName,
        },
        ...(loggedUser && {
          follower: {
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

    const totalPages = Math.ceil(totalFollowers / limit);

    return {
      followers,
      totalPages,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage };
  }
};
