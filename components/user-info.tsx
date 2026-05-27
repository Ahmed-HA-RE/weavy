import Link from 'next/link';
import { RiShieldUserFill } from 'react-icons/ri';
import { HiBadgeCheck } from 'react-icons/hi';
import { formatTimeToDistance } from '@/lib/utils';
import { User } from '@/lib/generated/prisma/client';
import PostCardAvatar from './post-card-avatar';

type UserInfoProps = {
  user: Pick<User, 'name' | 'displayName' | 'image' | 'role' | 'status'>;
  createdAt: Date;
};

const UserInfo = ({ user, createdAt }: UserInfoProps) => {
  console.log(user.status);
  return (
    <div className='flex items-center gap-3'>
      <Link href={`/profile/${user.name}`}>
        <PostCardAvatar user={user} />
      </Link>
      <div className='flex flex-col leading-tight'>
        <span className='flex items-center gap-1 text-sm'>
          {user.displayName || user.name}{' '}
          {user.role === 'ADMIN' ? (
            <RiShieldUserFill className='size-4 text-amber-600' />
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
