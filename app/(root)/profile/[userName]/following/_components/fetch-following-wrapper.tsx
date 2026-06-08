import { getUserFollowingsAction } from '@/lib/actions/user/get-user-followings-action';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import FollowingList from './following-list';
import { auth } from '@/lib/auth';

const FetchFollowingWrapper = async ({
  userName,
  page,
  loggedInUser,
}: {
  userName: string;
  page: number;
  loggedInUser: typeof auth.$Infer.Session.user | null;
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user-followings', page],
    queryFn: () => getUserFollowingsAction({ userName, page }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FollowingList userName={userName} loggedInUser={loggedInUser} />
    </HydrationBoundary>
  );
};

export default FetchFollowingWrapper;
