'use client';

import PostCard from '@/app/(root)/(home)/_components/post/post-card';
import PostCardSkeleton from '@/app/(root)/(home)/_components/post/post-card-skeleton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getUserLikesAction } from '@/lib/actions/user/get-user-likes-action';
import { auth } from '@/lib/auth';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { MdError } from 'react-icons/md';

const ProfileLikesTab = ({
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
      queryKey: ['user-likes', userName],
      queryFn: ({ pageParam = 1 }) =>
        getUserLikesAction({
          pageParam,
          userName,
          loggedUserId: loggedUser?.id,
        }),
      enabled: currentTab === 'likes',
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  const likes = data?.pages.flatMap((page) => page.likes) || [];

  if (status === 'pending') {
    return Array.from({ length: 10 }).map((_, index) => (
      <div className='mt-6' key={index}>
        <PostCardSkeleton type='profile' />
      </div>
    ));
  }

  if (likes.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-10'>
        <div className='relative aspect-3/2 w-full max-w-lg'>
          <Image src='/svg/profile-likes-tab.svg' alt='No likes' fill />
        </div>
        <div className='space-y-2.5 text-center'>
          <h2 className='font-semibold text-2xl md:text-4xl capitalize'>
            no likes yet
          </h2>
          <p className='text-center text-muted-foreground text-base md:text-lg max-w-md'>
            {isOwnProfile
              ? 'You have not liked any posts yet. Start exploring and engaging with content you enjoy!'
              : "Looks like this user hasn't liked any posts yet."}
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
          <AlertTitle>Something went wrong while getting likes.</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-6'>
        {likes.map((like) => (
          <PostCard
            key={like.post.id}
            post={like.post}
            loggedUser={loggedUser}
            profilePage={true}
            className={`${like.post.image ? 'lg:col-span-2' : ''}`}
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

export default ProfileLikesTab;
