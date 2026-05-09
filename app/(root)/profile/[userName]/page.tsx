import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

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

  const user = await db.user.findUnique({
    where: { name: userName },
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
    },
  });

  if (!user) {
    return redirect('/');
  }

  return (
    <>
      {/* Header Section */}
      <section className='spacing-top'>
        <div className='container'>
          <Button asChild variant='ghost' className='group mb-8'>
            <Link href='/'>
              <FaArrowLeft className='group-hover:-translate-x-1 transition-transform duration-400' />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
