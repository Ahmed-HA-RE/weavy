import db from '@/lib/db';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { FaLocationArrow } from 'react-icons/fa6';
import { IoIosLink } from 'react-icons/io';
import UploadAvatarButton from '@/components/upload-avatar-button';
import { cn } from '@/lib/utils';

type ProfileInfoProps = {
  loggedUserId: string;
};

const ProfileInfo = async ({ loggedUserId }: ProfileInfoProps) => {
  const user = await db.user.findUnique({
    where: { id: loggedUserId },
    select: {
      name: true,
      displayName: true,
      bio: true,
      image: true,
      location: true,
      website: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) return redirect('/login');
  const displayName = user.displayName || user.name;

  const userStats = [
    { label: 'Posts', count: user._count.posts },
    { label: 'Followers', count: user._count.followers },
    { label: 'Following', count: user._count.following },
  ];

  return (
    <aside className='flex flex-col items-center text-center shrink-0 lg:col-span-4'>
      <div className='space-y-6 mb-10'>
        <p className='text-2xl lg:text-3xl text-muted-foreground'>Profile</p>
        {/* Avatar */}
        <Avatar className='size-[150px]'>
          <Image
            src={user.image ?? '/default-avatar.png'}
            alt={user.name ?? 'User'}
            width={150}
            height={150}
            loading='eager'
            className='object-cover rounded-full'
          />
        </Avatar>
      </div>

      <div className='space-y-0.5'>
        {/* Display Name */}
        <h2 className='text-[28px] font-bold'>{displayName}</h2>
        {/* Username */}
        <h3 className={cn('text-lg text-muted-foreground', user.bio && 'mb-4')}>@{user.name}</h3>
        {/* Bio */}
        {user.bio && <p className='text-sm text-muted-foreground max-w-xs'>{user.bio}</p>}
      </div>

      {/* Stats */}
      <div className='flex items-center gap-12 w-full justify-center my-10'>
        {userStats.map((stat) => (
          <div key={stat.label} className='flex flex-col items-center gap-2.5'>
            <span className='text-3xl'>{stat.count}</span>
            <span className='text-base text-muted-foreground'>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Upload Button form */}
      <UploadAvatarButton
        endpoint='avatar'
        className='w-full max-w-[294px] ut-allowed-content:hidden ut-button:bg-primary mb-6 ut-button:h-10 ut-button:text-sm ut-button:font-medium ut-button:w-full'
      />

      {/* Location and Website */}
      <div className='space-y-2'>
        <span className='text-sm text-muted-foreground flex items-center gap-2'>
          <FaLocationArrow className='shrink-0 size-4' />
          {!user.location ? 'No Location Provided' : user.location}
        </span>
        <span className='text-sm text-muted-foreground flex items-center gap-2'>
          <IoIosLink className='shrink-0 size-4' />
          {!user.website ? (
            'No Website Provided'
          ) : (
            <a href={user.website} target='_blank' rel='noopener noreferrer'>
              {user.website}
            </a>
          )}
        </span>
      </div>
    </aside>
  );
};
export default ProfileInfo;
