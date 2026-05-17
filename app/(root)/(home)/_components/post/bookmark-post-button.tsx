'use client';

import { Button } from '@/components/ui/button';
import { toggleBookmarkPostAction } from '@/lib/actions/post/toggle-bookmark-post-action';
import { useQueryClient } from '@tanstack/react-query';
import { useOptimistic, useTransition } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { toast } from 'sonner';

const BookmarkPostButton = ({
  isUserBookmarked,
  postId,
}: {
  isUserBookmarked: boolean;
  postId: string;
}) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [optimisticBookmarks, setOptimisticBookmarks] = useOptimistic(
    isUserBookmarked,
    (state, newState: boolean) => newState,
  );

  const handleBookmarkPost = () => {
    startTransition(async () => {
      setOptimisticBookmarks(!optimisticBookmarks);
      const res = await toggleBookmarkPostAction(postId);
      if (res?.success && res.message) {
        toast.success(res.message);
      }
    });
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      }),
      queryClient.invalidateQueries({
        queryKey: ['user-posts'],
      }),
      queryClient.invalidateQueries({
        queryKey: ['user-likes'],
      }),
      queryClient.invalidateQueries({
        queryKey: ['user-bookmarks'],
      }),
    ]);
  };
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleBookmarkPost}
      disabled={isPending}
    >
      {optimisticBookmarks ? (
        <FaBookmark className='fill-blue-500' />
      ) : (
        <FaRegBookmark />
      )}
    </Button>
  );
};

export default BookmarkPostButton;
