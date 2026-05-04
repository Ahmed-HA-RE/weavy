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
import { Spinner } from './ui/spinner';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export const title = 'Simple Delete Confirmation';

type ActionResponse = {
  success: boolean;
  message: string;
};

type DeleteDialogProps = {
  title: string;
  subtitle?: string;
  trigger: React.ReactNode;
  confirmText?: string;
  action: () => Promise<ActionResponse>;
};

const DeleteDialog = ({
  title,
  subtitle,
  trigger,
  confirmText = 'Delete',
  action,
}: DeleteDialogProps) => {
  const [isPending, setIsPending] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    const res = await action();

    if (res.success) {
      setOpenDialog(false);
      toast.success(res.message);
    } else {
      toast.error(res.message);
      return;
    }
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {subtitle && (
            <AlertDialogDescription>{subtitle}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
