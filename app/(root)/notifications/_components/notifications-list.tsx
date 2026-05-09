'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { FaInfoCircle } from 'react-icons/fa';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyNotificationsAction } from '@/lib/actions/notification/get-my-notifications-action';
import Notification from './notification';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const NotificationsList = () => {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['notifications'],
      queryFn: ({ pageParam = 1 }) => getMyNotificationsAction({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
    });

  if (data?.pages.length === 0) {
    return (
      <Alert variant='info'>
        <FaInfoCircle />
        <AlertTitle>No notifications found.</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <div className='space-y-4 divide-y'>
        {data?.pages.map((page) =>
          page?.notifications?.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          )),
        )}
      </div>
      {hasNextPage && (
        <div className='mt-8 flex items-center gap-4'>
          <span className='h-px flex-1 bg-border' />
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant='outline'
            size='sm'
            className='rounded-full px-6'
          >
            {isFetchingNextPage ? (
              <>
                <Spinner /> Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
          <span className='h-px flex-1 bg-border' />
        </div>
      )}
    </>
  );
};

export default NotificationsList;
