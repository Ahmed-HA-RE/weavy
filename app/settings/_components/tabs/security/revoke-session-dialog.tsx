'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface RevokeSessionDialogProps {
  onRevoke: () => void;
  isPending: boolean;
  open: boolean;
  setOpenDialog: (open: boolean) => void;
}

const RevokeSessionDialog = ({ onRevoke, isPending, open, setOpenDialog }: RevokeSessionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant='destructive'>Revoke</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Sign out and remove session</DialogTitle>
          <DialogDescription className='sm:max-w-sm'>
            Are you sure you want to remove this session? This will sign the session out on that device.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col-reverse gap-4 sm:flex-row sm:justify-end'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button variant='destructive' onClick={onRevoke} disabled={isPending}>
            Remove session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RevokeSessionDialog;
