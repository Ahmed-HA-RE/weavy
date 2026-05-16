'use client';

import PostCard from '@/app/(root)/(home)/_components/post/post-card';
import PostCardSkeleton from '@/app/(root)/(home)/_components/post/post-card-skeleton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getUserPostsAction } from '@/lib/actions/user/get-user-posts-action';
import { auth } from '@/lib/auth';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { MdError } from 'react-icons/md';

const ProfilePostsTab = ({
  userName,
  currentTab,
  isOwnProfile,
  loggedUser,
}: {
  userName: string;
  currentTab: string;
  isOwnProfile: boolean;
  loggedUser: typeof auth.$Infer.Session.user | null;
}) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['user-posts', userName],
      queryFn: ({ pageParam = 1 }) =>
        getUserPostsAction({
          pageParam,
          userName,
          loggedUserId: loggedUser?.id,
        }),
      enabled: currentTab === 'posts',
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === 'pending') {
    return Array.from({ length: 10 }).map((_, index) => (
      <div className='mt-6' key={index}>
        <PostCardSkeleton />
      </div>
    ));
  }

  if (posts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-10'>
        <div className='relative aspect-3/2 w-full max-w-lg'>
          <Image src='/svg/no-posts-user-profile.svg' alt='No posts' fill />
        </div>
        <div className='space-y-2.5 text-center'>
          <h2 className='font-semibold text-2xl md:text-4xl capitalize'>
            no posts yet
          </h2>
          <p className='text-center text-muted-foreground text-base md:text-lg max-w-md'>
            {isOwnProfile
              ? 'You have not created any posts yet. Start sharing your thoughts and ideas with the world!'
              : "Looks like this user hasn't posted anything yet."}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='flex flex-col items-center justify-center max-w-md mx-auto'>
        <Alert variant='error'>
          <MdError />
          <AlertTitle>Something went wrong while getting posts.</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-6'>
        {posts.map((post) => (
          <PostCard
            key={post?.id}
            post={post}
            loggedUser={loggedUser}
            profilePage={true}
            className={`${post.image ? 'lg:col-span-2' : ''}`}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className='flex items-center justify-center mt-10'>
          <Button
            className='rounded-full max-w-md w-full'
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? <Spinner /> : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
};

export default ProfilePostsTab;
