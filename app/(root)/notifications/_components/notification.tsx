'use client';

import { cn } from '@/lib/utils';
import NotificationActions from './notification-actions';
import { format } from 'date-fns';
import Image from 'next/image';
import { Suspense } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { NOTIFICATION_TYPE } from '@/lib/generated/prisma/enums';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FaCommentDots, FaHeart } from 'react-icons/fa';
import { NotificationType } from '@/types/notification';

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
  const iconClass = 'size-3 text-white';
  switch (notificationtype) {
    case NOTIFICATION_TYPE.COMMENT:
      return <FaCommentDots className={iconClass} />;
    case NOTIFICATION_TYPE.LIKE:
      return <FaHeart className={iconClass} />;
    case NOTIFICATION_TYPE.FOLLOW:
      return <IoPersonAddSharp className={iconClass} />;
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

const Notification = ({ notification }: { notification: NotificationType }) => {
  return (
    <div className='relative flex gap-4 pb-4 last-of-type:pb-0'>
      {/* Read / Unread dot */}
      <span
        title={notification.read ? 'Read' : 'Unread'}
        className={cn(
          'absolute right-0 top-2 size-2 rounded-full',
          notification.read ? 'bg-green-600' : 'bg-accent animate-pulse',
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
        <h2 className='font-bold text-sm max-w-[250px] md:max-w-md'>
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
                      sizes='auto'
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
        {/* Actions */}
        <NotificationActions
          notificationId={notification.id}
          isRead={notification.read}
        />
      </div>
    </div>
  );
};

export default Notification;
