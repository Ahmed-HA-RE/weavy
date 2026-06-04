'use client';

import Image from 'next/image';
import { User } from '@/lib/generated/prisma/client';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

type UserProps = Pick<User, 'id' | 'name' | 'displayName' | 'image'>;

const UserListItem = ({
  isSettingsPage,
  user,
}: {
  isSettingsPage?: boolean;
  user: UserProps;
}) => {
  const displayName = user.displayName || user.name;
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      if (!isSettingsPage) {
      }
    });
  };

  return (
    <div className='flex items-center gap-4'>
      {/* Avatar */}
      <Avatar className='size-12 shrink-0'>
        <Image
          src={user.image ?? '/default-avatar.png'}
          alt={displayName ?? 'User'}
          width={48}
          height={48}
          className='object-cover rounded-full'
        />
      </Avatar>

      {/* Info + Action */}
      <div className='flex items-center justify-between flex-1'>
        <div className='flex flex-col'>
          <span className='text-sm font-medium leading-tight'>
            {displayName}
          </span>
          <span className='text-sm text-muted-foreground'>@{user.name}</span>
        </div>

        {/* Placeholder — wire up action later */}
        <Button variant='secondary' onClick={handleAction} disabled={isPending}>
          {isSettingsPage ? 'Unfollow' : 'Unblock'}
        </Button>
      </div>
    </div>
  );
};

export default UserListItem;
