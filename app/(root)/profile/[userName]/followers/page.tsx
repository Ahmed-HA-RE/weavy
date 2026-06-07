import db from '@/lib/db';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

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

const FollowersPage = async ({ params }: Props) => {
  const { userName } = await params;

  if (!userName) {
    return redirect('/');
  }

  return <div></div>;
};

export default FollowersPage;
