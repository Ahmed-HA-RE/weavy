import { Suspense } from 'react';
import { Avatar, AvatarBadge, AvatarFallback } from './ui/avatar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { User } from '@/lib/generated/prisma/client';

type UserAvatarProps = {
  user: Pick<User, 'name' | 'displayName' | 'image' | 'role' | 'status'>;
  className?: string;
};

const PostCardAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <Avatar size='lg' className={cn('relative', className)}>
      <Suspense
        fallback={
          <AvatarFallback className='uppercase'>
            {user.name.slice(0, 2)}
          </AvatarFallback>
        }
      ></Suspense>
      <Image
        alt={`${user.name}'s profile picture`}
        src={user.image!}
        width={70}
        height={70}
        className='rounded-full object-cover'
      />
      <AvatarBadge
        className={cn(
          user.status === 'ONLINE'
            ? 'bg-green-600 dark:bg-green-800'
            : user.status === 'OFFLINE'
              ? 'bg-gray-600 dark:bg-gray-800'
              : 'bg-yellow-600 dark:bg-yellow-800',
        )}
      />
    </Avatar>
  );
};
export default PostCardAvatar;
