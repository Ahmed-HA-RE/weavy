import { getMyNotificationsAction } from '@/lib/actions/notification/get-my-notifications-action';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import NotificationsList from './notifications-list';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const FetchNotificationsWrapper = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/sign-in');
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 1 }) => getMyNotificationsAction({ pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotificationsList />
    </HydrationBoundary>
  );
};

export default FetchNotificationsWrapper;
