import db from '@/lib/db';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ProfileHeaderSection from './_components/header/profille-header-section';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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

  if (!userName) {
    return redirect('/');
  }

  const loggedUser = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await db.user.findUnique({
    where: {
      name: userName,
      ...(loggedUser && {
        blocked: { none: { blockedId: loggedUser?.user?.id } },
        blocker: { none: { blockerId: loggedUser?.user?.id } },
      }),
    },
    include: {
      comments: true,
      posts: true,
      followers: true,
      following: true,
      likes: {
        include: {
          post: true,
        },
      },
      reported: {
        where: {
          reporterId: loggedUser?.user?.id,
        },
        select: { id: true },
      },
    },
  });
  if (!user) {
    return redirect('/');
  }

  return (
    <>
      {/* Header Section */}
      <section className='spacing-top'>
        <div className='container !max-w-3xl'>
          <ProfileHeaderSection
            user={user}
            loggedUser={loggedUser?.user || null}
          />
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
