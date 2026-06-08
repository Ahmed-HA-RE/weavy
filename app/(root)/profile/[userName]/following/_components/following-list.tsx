'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getUserFollowingsAction } from '@/lib/actions/user/get-user-followings-action';
import UsersListSkeleton from '@/components/users-list-skeleton';
import UserListItem from '@/components/user-list-item';
import { useQuery } from '@tanstack/react-query';
import { IoMdAlert } from 'react-icons/io';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import EmptyUsers from '@/components/empty-users';
import { parseAsInteger, useQueryState } from 'nuqs';
import { auth } from '@/lib/auth';

const FollowingList = ({
  userName,
  loggedInUser,
}: {
  userName: string;
  loggedInUser: typeof auth.$Infer.Session.user | null;
}) => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: true }),
  );

  const { data, isFetching, status, error } = useQuery({
    queryKey: ['user-followings', page],
    queryFn: () => getUserFollowingsAction({ userName, page }),
  });

  if (status === 'pending' || isFetching) {
    return <UsersListSkeleton />;
  }

  if (status === 'error') {
    return (
      <Alert variant='error' className='max-w-2xl mx-auto'>
        <IoMdAlert />
        <AlertTitle>{error.message}</AlertTitle>
      </Alert>
    );
  }

  if (!data.followings?.length) {
    return (
      <EmptyUsers type='following' isOwner={loggedInUser?.name === userName} />
    );
  }

  const { followings, totalPages } = data;

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-6'>
        {followings?.map((following) => {
          const isFollowing = following.followers?.some(
            (f) => f.followerId === loggedInUser?.id,
          );
          return (
            <UserListItem
              user={following}
              key={following.id}
              isFollowing={isFollowing}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-end gap-3 pt-10'>
          <Button
            variant='outline'
            size='sm'
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className='gap-1'
          >
            <IoChevronBack className='size-4' />
            Previous
          </Button>
          <span className='text-sm text-muted-foreground'>
            Page {page} of {totalPages}
          </span>
          <Button
            variant='outline'
            size='sm'
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className='gap-1'
          >
            Next
            <IoChevronForward className='size-4' />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FollowingList;
