import FollowButton from '@/components/follow-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { USER_ROLE } from '@/lib/generated/prisma/enums';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { RiShieldUserFill } from 'react-icons/ri';
import ProfileHeaderDropdown from './profile-header-dropdown';
import { formatLargeNumber } from '@/lib/utils';
import db from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const ProfileHeader = async ({
  userName,
  loggedUser,
}: {
  userName: string;
  loggedUser: typeof auth.$Infer.Session.user | null;
}) => {
  const user = await db.user.findUnique({
    where: {
      name: userName,
      ...(loggedUser && {
        blocked: { none: { blockedId: loggedUser?.id } },
        blocker: { none: { blockerId: loggedUser?.id } },
      }),
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
      followers: {
        where: {
          followerId: loggedUser?.id,
        },
      },
      reported: {
        where: {
          reporterId: loggedUser?.id,
        },
        select: { id: true },
      },
    },
  });

  if (!user) {
    return redirect('/');
  }

  const displayName = user.displayName || user.name;
  const isOwner = loggedUser?.id === user.id;
  const isFollowing = user.followers.length > 0;
  const isUserLoggedIn = !!loggedUser;
  const isReportedByLoggedUser = user.reported.length > 0;

  const userBadge = (role: USER_ROLE) => {
    switch (role) {
      case USER_ROLE.ADMIN:
        return <RiShieldUserFill className='text-amber-600' title='Admin' />;
      case USER_ROLE.USER:
        return <HiBadgeCheck className='text-accent' title='User' />;
      default:
        return null;
    }
  };

  const userMetrics = [
    {
      label: 'posts',
      count: user._count.posts,
    },
    {
      label: 'followers',
      count: user._count.followers,
    },
    {
      label: 'following',
      count: user._count.following,
    },
  ];

  return (
    <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start'>
      {/* Left Column */}
      <Avatar className='size-[150px]'>
        <Suspense
          fallback={<AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>}
        >
          <Image
            src={user.image}
            alt={`${user.name}'s profile picture`}
            width={150}
            height={150}
            className='object-cover rounded-full'
          />
        </Suspense>
      </Avatar>
      {/* Right Column */}
      <div className='space-y-5'>
        {/* Top Content */}
        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
          {/* Display user name */}
          <h1 className='text-xl inline-flex items-center gap-3'>
            {displayName}
            {userBadge(user.role)}
          </h1>
          {/* Actions */}
          <div className='space-x-2.5 flex items-center'>
            {!isUserLoggedIn ? (
              <Button asChild variant='secondary' className='min-w-20'>
                <Link href={`/sign-in?callbackURL=/profile/${user.name}`}>
                  Follow
                </Link>
              </Button>
            ) : !isOwner && isUserLoggedIn ? (
              <FollowButton
                userId={user.id}
                isToggle={true}
                isFollowing={isFollowing}
                className='h-9'
              />
            ) : (
              <Button asChild variant='outline'>
                <Link href='/settings?tab=account'>Edit Profile</Link>
              </Button>
            )}
            <ProfileHeaderDropdown
              isOwner={isOwner}
              user={{ id: user.id, name: user.displayName || user.name }}
              isUserLoggedIn={isUserLoggedIn}
              loggedInUserId={loggedUser?.id || null}
              isReportedByLoggedUser={isReportedByLoggedUser}
            />
          </div>
        </div>
        <div className='flex items-center justify-center lg:justify-start gap-x-10'>
          {userMetrics.map((metric) => (
            <span key={metric.label} className='text-muted-foreground text-sm'>
              <span className='font-semibold text-foreground'>
                {formatLargeNumber(metric.count)}
              </span>{' '}
              {metric.label}
            </span>
          ))}
        </div>
        <div className='text-center lg:text-left space-y-1 text-sm'>
          <p className='font-semibold'>{user.name}</p>
          {user.bio && <p>{user.bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
