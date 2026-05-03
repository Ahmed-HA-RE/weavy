import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/avatar';
import Image from 'next/image';
import { Suspense } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { HiBadgeCheck } from 'react-icons/hi';
import { formatTimeToDistance } from '@/lib/utils';
import { User } from '@/lib/generated/prisma/client';

type UserInfoProps = {
  user: Pick<User, 'name' | 'displayName' | 'image' | 'role'>;
  createdAt: Date;
};

const UserInfo = ({ user, createdAt }: UserInfoProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Link href={`/${user.name}`}>
        <Avatar size='lg'>
          <Suspense
            fallback={<AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>}
          >
            <Image
              src={user.image}
              alt={user.name}
              width={40}
              height={40}
              className='rounded-full object-cover'
            />
          </Suspense>
        </Avatar>
      </Link>
      <div className='flex flex-col leading-tight'>
        <span className='flex items-center gap-1 text-sm'>
          {user.displayName || user.name}{' '}
          {user.role === 'ADMIN' ? (
            <MdAdminPanelSettings className='size-4 text-amber-600' />
          ) : (
            <HiBadgeCheck className='size-4 text-accent ' />
          )}
        </span>
        <p className='text-sm text-muted-foreground'>
          @{user.name} · {formatTimeToDistance(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
