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
    reported: {
      where: {
        reporterId: string | undefined;
      };
      select: {
        id: true;
      };
    };
  };
}>;
