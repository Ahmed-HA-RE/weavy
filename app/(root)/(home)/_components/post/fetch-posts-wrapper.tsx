import { getPostsAction } from '@/lib/actions/post/get-posts-action';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PostList from './post-list';
import { auth } from '@/lib/auth';

const FetchPostsWrapper = async ({
  loggedInUser,
}: {
  loggedInUser: typeof auth.$Infer.Session.user | null;
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => getPostsAction({ pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList loggedInUser={loggedInUser} />
    </HydrationBoundary>
  );
};

export default FetchPostsWrapper;
