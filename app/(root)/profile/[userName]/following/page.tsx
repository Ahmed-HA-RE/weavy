import db from '@/lib/db';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import FetchFollowingWrapper from './_components/fetch-following-wrapper';
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
      title: `${user.displayName || user.name}'s Following`,
      description: `View who ${user.displayName || user.name} is following.`,
      openGraph: {
        type: 'profile',
        title: `${user.displayName || user.name}'s Following`,
        description: `View who ${user.displayName || user.name} is following.`,
        images: user.image ? [user.image] : ['/images/avatar.png'],
      },
    };
  }

  return {
    title: 'User not found',
  };
};

interface FollowingPageProps {
  params: Props['params'];
  searchParams: Promise<SearchParams>;
}

const FollowingPage = async ({ params, searchParams }: FollowingPageProps) => {
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
      type='following'
      loggedInUser={session?.user || null}
    >
      <Suspense fallback={<UsersListSkeleton />}>
        <FetchFollowingWrapper
          userName={userName}
          page={page}
          loggedInUser={session?.user || null}
        />
      </Suspense>
    </FollowListWrapper>
  );
};

export default FollowingPage;
