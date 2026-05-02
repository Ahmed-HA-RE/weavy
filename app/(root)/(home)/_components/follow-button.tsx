'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { followUserToggleAction } from '@/lib/actions/users/follow-user-toggle-action';
import { useTransition } from 'react';
import { toast } from 'sonner';

const FollowButton = ({ userId }: { userId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
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
      className='min-w-20'
      disabled={isPending}
      onClick={handleFollow}
    >
      {isPending ? <Spinner /> : 'Follow'}
    </Button>
  );
};

export default FollowButton;
