'use client';

import PostCard from '@/app/(root)/(home)/_components/post/post-card';
import PostCardSkeleton from '@/app/(root)/(home)/_components/post/post-card-skeleton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getUserBookmarksAction } from '@/lib/actions/user/get-user-bookmarks-action';
import { auth } from '@/lib/auth';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { MdError } from 'react-icons/md';

const ProfileBookmarksTab = ({
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
      queryKey: ['user-bookmarks', userName],
      queryFn: ({ pageParam = 1 }) =>
        getUserBookmarksAction({
          pageParam,
          userName,
          loggedUserId: loggedUser?.id,
        }),
      enabled: currentTab === 'bookmarks',
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  const bookmarks = data?.pages.flatMap((page) => page.bookmarks) || [];

  if (status === 'pending') {
    return Array.from({ length: 10 }).map((_, index) => (
      <div className='mt-6' key={index}>
        <PostCardSkeleton type='profile' />
      </div>
    ));
  }

  if (bookmarks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-10'>
        <div className='relative aspect-3/2 w-full max-w-lg'>
          <Image
            src='/svg/no-bookmarks-user-profile.svg'
            alt='No bookmarks'
            fill
          />
        </div>
        <div className='space-y-2.5 text-center'>
          <h2 className='font-semibold text-2xl md:text-4xl capitalize'>
            no bookmarks yet
          </h2>
          <p className='text-center text-muted-foreground text-base md:text-lg max-w-md'>
            {isOwnProfile
              ? 'You have not bookmarked any posts yet. Start exploring and engaging with content you enjoy!'
              : "Looks like this user hasn't bookmarked any posts yet."}
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
          <AlertTitle>Something went wrong while getting bookmarks.</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-6'>
        {bookmarks.map((bookmark) => (
          <PostCard
            key={bookmark.post.id}
            post={bookmark.post}
            loggedUser={loggedUser}
            profilePage={true}
            className={`${bookmark.post.image ? 'lg:col-span-2' : ''}`}
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

export default ProfileBookmarksTab;
