'use client';

import PostCard from './post-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsAction } from '@/lib/actions/post/get-posts-action';
import { authClient } from '@/lib/auth-client';
import { Alert } from '@/components/ui/alert';
import { BiSolidCommentError } from 'react-icons/bi';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import PostSkeletonCard from './post-skeleton-card';
import { FaInfoCircle } from 'react-icons/fa';

const PostList = () => {
  const { data: session } = authClient.useSession();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => getPostsAction({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastpage) => lastpage.nextPage,
    refetchOnWindowFocus: false,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (data?.pages.length === 0) {
    return (
      <Alert variant='info'>
        <FaInfoCircle />
        No posts found
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant='error'>
        <BiSolidCommentError />
        Something went wrong while loading posts. Please try again later.
      </Alert>
    );
  }

  return (
    <div className='space-y-6'>
      {data?.pages.map((page) =>
        page.posts.map((post) => (
          <PostCard key={post.id} post={post} loggedUser={session?.user} />
        )),
      )}
      <div ref={ref}>{isFetchingNextPage && <PostSkeletonCard />}</div>
    </div>
  );
};

export default PostList;
