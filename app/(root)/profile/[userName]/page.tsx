import db from '@/lib/db';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ProfileHeader from './_components/header/profile-header';
import ProfileHeaderSkeleton from './_components/header/profile-header-skeleton';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import ProfileTabs from './_components/tabs/profile-tabs';

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
      title: `${user.displayName || user.name}'s Profile`,
      description: `View ${user.displayName || user.name}'s profile and posts.`,
      openGraph: {
        type: 'profile',
        title: `${user.displayName || user.name}'s Profile`,
        description: `View ${user.displayName || user.name}'s profile and posts.`,
        images: user.image ? [user.image] : ['/images/avatar.png'],
      },
    };
  }

  return {
    title: 'User not found',
  };
};

const ProfilePage = async ({ params }: Props) => {
  const { userName } = await params;

  const loggedUser = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userName) {
    return redirect('/');
  }

  return (
    <>
      {/* Header Section */}
      <section className='spacing-top'>
        <div className='profile-container'>
          <Suspense fallback={<ProfileHeaderSkeleton />}>
            <ProfileHeader
              userName={userName}
              loggedUser={loggedUser?.user || null}
            />
          </Suspense>
        </div>
      </section>
      {/* Tabs Section */}
      <section className='pt-12.5'>
        <div className='container'>
          <ProfileTabs
            userName={userName}
            loggedUser={loggedUser?.user || null}
          />
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
