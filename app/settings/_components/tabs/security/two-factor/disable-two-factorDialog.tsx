'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { BsFillShieldSlashFill } from 'react-icons/bs';
import PasswordVerificationForm from './password-verification-form';
import { IoMdClose } from 'react-icons/io';

const DisableTwoFactorDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='dark:bg-transparent dark:text-black'
        >
          Disable
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-lg gap-6'>
        <AlertDialogCancel
          className='absolute top-2 right-2'
          variant={'ghost'}
          size={'icon'}
        >
          <IoMdClose />
          <span className='sr-only'>Close</span>
        </AlertDialogCancel>
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='flex items-center justify-center bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive size-14 rounded-full'>
            <BsFillShieldSlashFill className='size-7' />
          </div>
          <div className='text-center space-y-2'>
            <AlertDialogTitle className='text-lg'>
              Disable 2FA?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently disable two-factor authentication for your
              account. Are you sure you want to proceed?
            </AlertDialogDescription>
          </div>
        </div>
        {/* Password form */}
        <PasswordVerificationForm mode='disable' />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DisableTwoFactorDialog;
