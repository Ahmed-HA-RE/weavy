'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { MdBlock } from 'react-icons/md';
import { IoMdAlert } from 'react-icons/io';
import { blockUserAction } from '@/lib/actions/user/block-user-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

type BlockUserDialogProps = {
  user: {
    id: string;
    name: string;
  };
};

const BlockUserDialog = ({ user }: BlockUserDialogProps) => {
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBlockUser = () => {
    startTransition(async () => {
      const res = await blockUserAction(user.id);
      if (res.success) {
        setOpenBlockDialog(false);
        toast.success(res.message);
        router.push('/');
      } else {
        toast.error(res.message);
        return;
      }
    });
  };

  return (
    <AlertDialog open={openBlockDialog} onOpenChange={setOpenBlockDialog}>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          className='px-2 h-8 hover:bg-accent hover:text-accent-foreground w-full justify-start'
        >
          <MdBlock />
          Block User
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='place-items-center! items-center gap-1'>
          <div className='bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
            <IoMdAlert className='text-destructive size-6' />
          </div>
          <AlertDialogTitle className='text-center'>
            Are you sure you want to block {user.name}?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            This will permanently block {user.name} and you will not be able to
            see their profile or interact with them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='mt-4'>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            onClick={handleBlockUser}
            disabled={isPending}
            className='min-w-20'
          >
            {isPending ? <Spinner /> : 'Block'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BlockUserDialog;
