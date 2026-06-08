'use client';

import { Button } from '@/components/ui/button';
import { unblockUserAction } from '@/lib/actions/settings/unblock-user-action';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

const UnblockUserButton = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      const res = await unblockUserAction(userId);
      if (!res.success) {
        toast.error(res?.message);
        return;
      }
      toast.success(res.message);
      router.refresh();
    });
  };
  return (
    <Button variant='secondary' onClick={handleAction} disabled={isPending}>
      Unblock
    </Button>
  );
};

export default UnblockUserButton;
