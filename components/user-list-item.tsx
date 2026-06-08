'use client';

import Image from 'next/image';
import { User } from '@/lib/generated/prisma/client';
import { Avatar } from '@/components/ui/avatar';
import UnblockUserButton from '@/app/settings/_components/tabs/privacy/unblock-user-button';
import FollowButton from './follow-button';
import Link from 'next/link';

type UserProps = Pick<User, 'id' | 'name' | 'displayName' | 'image'>;

const UserListItem = ({
  isSettingsPage,
  user,
  isFollowing,
}: {
  isSettingsPage?: boolean;
  user: UserProps;
  isFollowing?: boolean;
}) => {
  const displayName = user.displayName || user.name;

  return (
    <div className='flex items-center gap-4'>
      {/* Avatar */}
      <Link href={`/profile/${user.name}`}>
        <Avatar className='size-12 shrink-0'>
          <Image
            src={user.image ?? '/default-avatar.png'}
            alt={displayName ?? 'User'}
            width={150}
            height={150}
            className='object-cover rounded-full'
          />
        </Avatar>
      </Link>

      {/* Info + Action */}
      <div className='flex items-center justify-between flex-1'>
        <div className='flex flex-col'>
          <span className='text-sm font-medium leading-tight'>
            {displayName}
          </span>
          <span className='text-sm text-muted-foreground'>@{user.name}</span>
        </div>
        {isSettingsPage ? (
          <UnblockUserButton userId={user.id} />
        ) : (
          <FollowButton
            isToggle={true}
            userId={user.id}
            isFollowing={isFollowing}
          />
        )}
      </div>
    </div>
  );
};

export default UserListItem;
