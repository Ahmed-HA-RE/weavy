'use client';

import {
  AlertDialog,
  AlertDialogAction,
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

export const title = 'Simple Delete Confirmation';

type DeleteDialogProps = {
  title: string;
  subtitle?: string;
  trigger: React.ReactNode;
  deleteContent?: string;
  action?: () => void;
  isPending?: boolean;
  openDialog?: boolean;
  setOpenDialog?: (open: boolean) => void;
};

const DeleteDialog = ({
  title,
  subtitle,
  trigger,
  deleteContent = 'Delete',
  action,
  isPending,
  openDialog,
  setOpenDialog,
}: DeleteDialogProps) => (
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
        <Button variant='destructive' onClick={action} disabled={isPending}>
          {isPending ? <Spinner /> : deleteContent}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteDialog;
