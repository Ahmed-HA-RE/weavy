import { Prisma } from '@/lib/generated/prisma/client';

export type ProfileType = Prisma.UserGetPayload<{
  include: {
    comments: true;
    posts: true;
    followers: true;
    following: true;
    likes: {
      include: {
        post: true;
      };
    };
  };
}>;
