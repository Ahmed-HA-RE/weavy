import db from '@/lib/db';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import FetchFollowersWrapper from './_components/fetch-followers-wrapper';
import { SearchParams } from 'nuqs/server';
import { loadSearchParams } from '@/lib/searchParams';
import FollowListWrapper from '@/components/follow-list-wrapper';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';
import UsersListSkeleton from '@/components/users-list-skeleton';

type Props = {
  params: Promise<{ userName: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { userName } = await params;

  const user = await db.user.findUnique({
    where: { name: userName },
    select: {
      name: true,
      displayName: true,
      bio: true,
      image: true,
    },
  });

  if (user) {
    return {
      title: `${user.displayName || user.name}'s Followers`,
      description: `View ${user.displayName || user.name}'s followers.`,
      openGraph: {
        type: 'profile',
        title: `${user.displayName || user.name}'s Followers`,
        description: `View ${user.displayName || user.name}'s followers.`,
        images: user.image ? [user.image] : ['/images/avatar.png'],
      },
    };
  }

  return {
    title: 'User not found',
  };
};

interface FollowersPageProps {
  params: Props['params'];
  searchParams: Promise<SearchParams>;
}

const FollowersPage = async ({ params, searchParams }: FollowersPageProps) => {
  const { userName } = await params;
  const { page } = await loadSearchParams(searchParams);

  if (!userName) {
    return redirect('/');
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <FollowListWrapper
      userName={userName}
      type='followers'
      loggedInUser={session?.user || null}
    >
      <Suspense fallback={<UsersListSkeleton />}>
        <FetchFollowersWrapper
          userName={userName}
          page={page}
          loggedInUser={session?.user || null}
        />
      </Suspense>
    </FollowListWrapper>
  );
};

export default FollowersPage;
