import { getPostsAction } from '@/lib/actions/post/get-posts-action';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PostList from './post-list';

const FetchPostsWrapper = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => getPostsAction({ pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
};

export default FetchPostsWrapper;
