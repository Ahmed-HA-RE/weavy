import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import PostHeader from './_components/post-header';
import { Suspense } from 'react';
import PostHeaderSkeleton from './_components/post-header-skeleton';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  const post = await db.post.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (post) {
    return {
      title: `Post by ${post.user.name}`,
      description: post.content,
      openGraph: {
        type: 'article',
        title: `Post by ${post.user.name}`,
        description: post.content ?? undefined,
        images: post.image ? [post.image] : undefined,
      },
    };
  } else {
    return {
      title: 'Post not found',
      description: 'The post you are looking for does not exist.',
    };
  }
};

const PostPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return redirect('/'); // Redirect to home if no ID is provided
  }

  const loggedUser = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <section className='spacing-top'>
        <div className='container'>
          <Suspense fallback={<PostHeaderSkeleton />}>
            <PostHeader id={id} loggedUser={loggedUser?.user ?? null} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default PostPage;
