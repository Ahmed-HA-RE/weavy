import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import CreatePost from './_components/create-post';
import { Suspense } from 'react';
import SuggestedUsers from './_components/suggested-users';
import SuggestedUsersSkeleton from './_components/suggested-users-skeleton';
import PostList from './_components/post-list';

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-11 gap-6'>
      <div className='lg:col-span-7 order-2 lg:order-1 space-y-10'>
        {session && (
          <section>
            <CreatePost user={session.user} />
          </section>
        )}
        <section>
          <Suspense>
            <PostList loggedUser={session?.user?.id} />
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
