import { auth } from '@/lib/auth';
import db from '@/lib/db';

const capitilizedFirstLetter = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1);

const FollowListWrapper = async ({
  children,
  userName,
  type,
  loggedInUser,
}: {
  children: React.ReactNode;
  userName: string;
  type: 'followers' | 'following';
  loggedInUser: typeof auth.$Infer.Session.user | null;
}) => {
  const userDisplayName = await db.user.findUnique({
    where: { name: userName },
    select: {
      displayName: true,
    },
  });

  const displayName = userDisplayName?.displayName || userName;
  const isOwner = loggedInUser?.name === userName;

  return (
    <div className='space-y-6 container spacing-top'>
      <div className='border-b border-border pb-4'>
        <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
          {loggedInUser && isOwner
            ? `Your ${capitilizedFirstLetter(type)}`
            : `${displayName}'s ${capitilizedFirstLetter(type)}`}{' '}
        </h1>
        {loggedInUser && !isOwner && (
          <p className='text-sm text-muted-foreground mt-1'>@{userName}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default FollowListWrapper;
