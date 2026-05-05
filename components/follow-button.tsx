'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { followUserToggleAction } from '@/lib/actions/user/follow-user-toggle-action';
import { cn } from '@/lib/utils';
import { useTransition, useOptimistic } from 'react';
import { toast } from 'sonner';

const FollowButton = ({
  userId,
  isToggle = false,
  isFollowing,
  className,
}: {
  userId: string;
  isToggle: boolean;
  isFollowing?: boolean;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticFollow, setOptimisticFollow] = useOptimistic(isFollowing);

  const handleFollow = () => {
    startTransition(async () => {
      if (isToggle) {
        setOptimisticFollow((prev) => !prev); // Optimistically toggle follow state
      }
      const result = await followUserToggleAction(userId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        return;
      }
    });
  };

  return (
    <Button
      variant='secondary'
      className={cn('min-w-20', className)}
      disabled={isPending}
      onClick={handleFollow}
    >
      {isToggle ? (
        optimisticFollow ? (
          'UnFollow'
        ) : (
          'Follow'
        )
      ) : isPending ? (
        <Spinner />
      ) : (
        'Follow'
      )}
    </Button>
  );
};

export default FollowButton;
