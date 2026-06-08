import { getUserFollowersAction } from '@/lib/actions/user/get-user-followers-action';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import FollowersList from './followers-list';
import { auth } from '@/lib/auth';

const FetchFollowersWrapper = async ({
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
    queryKey: ['user-followers', page],
    queryFn: () => getUserFollowersAction({ userName, page }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FollowersList userName={userName} loggedInUser={loggedInUser} />
    </HydrationBoundary>
  );
};

export default FetchFollowersWrapper;
