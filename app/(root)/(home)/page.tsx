import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import SuggestedUsers from './_components/suggested-users';
import SuggestedUsersSkeleton from './_components/suggested-users-skeleton';
import PostSkeletonCard from './_components/post/post-skeleton-card';
import FetchPostsWrapper from './_components/post/fetch-posts-wrapper';
import PostForm from './_components/post/post-form';
import SideBar from '@/components/side-bar';
import SideBarSkeleton from '@/components/side-bar-skeleton';

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-7 container spacing-top'>
      {/* SideBar */}
      <aside className='hidden lg:block lg:col-span-3 sticky top-4 self-start'>
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
      </aside>
      {/* Content */}
      <div className='lg:col-span-9 grid grid-cols-1 lg:grid-cols-11 gap-6'>
        <section className='lg:col-span-7 order-2 lg:order-1 space-y-6'>
          {session && (
            <div>
              <PostForm user={session.user} />
            </div>
          )}
          <div>
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
          </div>
        </section>

        {session && (
          <aside className='lg:col-span-4 lg:sticky lg:top-4 lg:self-start order-1 lg:order-2'>
            <Suspense fallback={<SuggestedUsersSkeleton />}>
              <SuggestedUsers userId={session.user.id} />
            </Suspense>
          </aside>
        )}
      </div>
    </div>
  );
};

export default HomePage;
