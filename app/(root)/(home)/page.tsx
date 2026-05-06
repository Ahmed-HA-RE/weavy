import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import CreatePost from './_components/post/create-post';
import { Suspense } from 'react';
import SuggestedUsers from './_components/suggested-users';
import SuggestedUsersSkeleton from './_components/suggested-users-skeleton';
import PostSkeletonCard from './_components/post/post-skeleton-card';
import FetchPostsWrapper from './_components/post/fetch-posts-wrapper';

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-11 gap-6'>
      <div className='lg:col-span-7 order-2 lg:order-1 space-y-6'>
        {session && (
          <section>
            <CreatePost user={session.user} />
          </section>
        )}
        <section>
          <Suspense
            fallback={
              <div className='space-y-6'>
                {Array.from({ length: 10 }).map((_, index) => (
                  <PostSkeletonCard key={index} />
                ))}
              </div>
            }
          >
            <FetchPostsWrapper />
          </Suspense>
        </section>
      </div>

      {session && (
        <aside className='lg:col-span-4 lg:sticky lg:top-4 lg:self-start order-1 lg:order-2'>
          <Suspense fallback={<SuggestedUsersSkeleton />}>
            <SuggestedUsers userId={session.user.id} />
          </Suspense>
        </aside>
      )}
    </div>
  );
};

export default HomePage;
