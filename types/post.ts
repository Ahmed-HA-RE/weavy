import { Prisma } from '@/lib/generated/prisma/client';

export type PostWithRelations = Prisma.PostGetPayload<{
  select: {
    id: true;
    content: true;
    image: true;
    createdAt: true;
    user: {
      select: {
        id: true;
        name: true;
        displayName: true;
        image: true;
        role: true;
        followers: {
          where: {
            followerId: string | undefined;
          };
        };
      };
    };
    comments: {
      select: {
        id: true;
        content: true;
        createdAt: true;
        user: {
          select: {
            id: true;
            name: true;
            displayName: true;
            image: true;
            role: true;
          };
        };
      };
    };
    likes: {
      select: {
        userId: true;
        postId: true;
      };
    };
    _count: {
      select: {
        likes: true;
        comments: true;
      };
    };
  };
}>;
