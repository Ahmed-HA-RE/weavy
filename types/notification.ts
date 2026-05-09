import { Prisma } from '@/lib/generated/prisma/client';

export type NotificationType = Prisma.NotificationGetPayload<{
  include: {
    sender: {
      select: {
        id: true;
        name: true;
        displayName: true;
        image: true;
      };
    };
    comment: {
      select: {
        content: true;
      };
    };
    follow: {
      select: {
        follower: {
          select: {
            name: true;
          };
        };
      };
    };
    post: {
      select: {
        likes: {
          where: {
            userId: string;
          };
          include: {
            user: {
              select: {
                name: true;
              };
            };
          };
        };
        image: true;
        content: true;
      };
    };
  };
}>;
