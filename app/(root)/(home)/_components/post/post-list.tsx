'use client';

import PostCard from './post-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsAction } from '@/lib/actions/post/get-posts-action';
import { Alert } from '@/components/ui/alert';
import { BiSolidCommentError } from 'react-icons/bi';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { auth } from '@/lib/auth';
import { Spinner } from '@/components/ui/spinner';

const PostList = ({
  loggedInUser,
}: {
  loggedInUser: typeof auth.$Infer.Session.user | null;
}) => {
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

  const feedPosts = data?.pages.flatMap((page) => page.posts) || [];

  if (feedPosts.length === 0) {
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
    <>
      <div className='space-y-6'>
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} loggedUser={loggedInUser} />
        ))}
      </div>
      <div className='mt-6' ref={ref}>
        {isFetchingNextPage && <Spinner className='mx-auto size-6.5 mt-8' />}
      </div>
    </>
  );
};

export default PostList;
