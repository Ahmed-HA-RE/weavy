import { Alert, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import db from '@/lib/db';
import { NOTIFICATION_TYPE } from '@/lib/generated/prisma/enums';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import { Suspense } from 'react';
import { FaInfoCircle, FaCommentDots, FaHeart } from 'react-icons/fa';
import { IoPersonAddSharp } from 'react-icons/io5';

const NotificationsList = async ({
  loggedUserId,
}: {
  loggedUserId: string;
}) => {
  const notifications = await db.notification.findMany({
    where: {
      receiverId: loggedUserId,
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
              userId: loggedUserId,
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
  });

  if (notifications.length === 0) {
    return (
      <Alert variant='info'>
        <FaInfoCircle />
        <AlertTitle>No notifications found.</AlertTitle>
      </Alert>
    );
  }

  const formatContent = ({
    notificationType,
    notificationContent,
  }: {
    notificationType: NOTIFICATION_TYPE;
    notificationContent: string | undefined;
  }) => {
    switch (notificationType) {
      case NOTIFICATION_TYPE.COMMENT:
        return `has commented on your post: "${notificationContent}"`;
      case NOTIFICATION_TYPE.LIKE:
        return 'has liked your post.';
      case NOTIFICATION_TYPE.FOLLOW:
        return 'has started following you.';
      default:
        return 'has sent you a notification.';
    }
  };

  const notificationIcon = (notificationtype: NOTIFICATION_TYPE) => {
    switch (notificationtype) {
      case NOTIFICATION_TYPE.COMMENT:
        return <FaCommentDots className='size-3 text-white' />;
      case NOTIFICATION_TYPE.LIKE:
        return <FaHeart className='size-3 text-white' />;
      case NOTIFICATION_TYPE.FOLLOW:
        return <IoPersonAddSharp className='size-3 text-white' />;
    }
  };

  const notificationBadgeClass = (type: NOTIFICATION_TYPE) => {
    switch (type) {
      case NOTIFICATION_TYPE.COMMENT:
        return 'bg-blue-500';
      case NOTIFICATION_TYPE.LIKE:
        return 'bg-rose-500';
      case NOTIFICATION_TYPE.FOLLOW:
        return 'bg-emerald-500';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className='divide-y space-y-4'>
      {notifications.map((notification) => (
        <div key={notification.id} className='relative flex gap-3 pb-4'>
          {/* Read / Unread dot */}
          <span
            title={notification.read ? 'Read' : 'Unread'}
            className={cn(
              'absolute right-0 top-2 size-2 rounded-full',
              notification.read
                ? 'bg-green-600'
                : 'bg-accent-foreground animate-pulse',
            )}
          />
          {/* Left side */}
          <Avatar className='size-12 relative'>
            <Suspense
              fallback={
                <AvatarFallback>
                  {notification.sender.name.slice(0, 2)}
                </AvatarFallback>
              }
            >
              <Image
                src={notification.sender.image}
                alt={notification.sender.name}
                width={48}
                height={48}
                className='rounded-full object-cover'
              />
            </Suspense>
            <span
              className={cn(
                'absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full ring-2 ring-background',
                notificationBadgeClass(notification.type),
              )}
            >
              {notificationIcon(notification.type)}
            </span>
          </Avatar>
          {/* Right side */}
          <div className='flex flex-col gap-1 flex-1'>
            <h2 className='font-semibold text-sm max-w-[250px] md:max-w-md'>
              {notification.sender.displayName || notification.sender.name}{' '}
              <span className='font-normal'>
                {formatContent({
                  notificationContent: notification.comment?.content,
                  notificationType: notification.type,
                })}
              </span>
            </h2>
            <p className='text-sm font-normal text-muted-foreground'>
              {format(new Date(notification.createdAt), 'PPP')}
            </p>
            {(notification.type === NOTIFICATION_TYPE.LIKE ||
              notification.type === NOTIFICATION_TYPE.COMMENT) &&
              notification.post &&
              (notification.post.image || notification.post.content) && (
                <Card className='py-2 mt-2 max-w-xs'>
                  <CardContent className='flex items-center gap-2'>
                    {notification.post.image && (
                      <div className='relative size-9 overflow-hidden rounded-md'>
                        <Image
                          src={notification.post.image}
                          alt='Post'
                          fill
                          className='object-cover'
                        />
                      </div>
                    )}
                    {notification.post.content && (
                      <p className='text-xs text-muted-foreground line-clamp-2 leading-relaxed'>
                        {notification.post.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
          </div>
          {/* @todo: add actions */}
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
