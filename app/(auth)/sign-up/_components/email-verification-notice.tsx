'use client';

import { Button } from '@/components/ui/button';
import { LuCircleCheckBig } from 'react-icons/lu';
import { authClient } from '@/lib/auth-client';
import { useTransition } from 'react';
import { toast } from 'sonner';

const EmailVerificationNotice = ({
  email,
  callbackURL,
}: {
  email: string;
  callbackURL: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleResend = () => {
    startTransition(async () => {
      try {
        const { error } = await authClient.sendVerificationEmail({
          email,
          callbackURL: `/verify-email?callbackUrl=${encodeURIComponent(callbackURL)}`,
        });

        if (error) {
          throw new Error(error.message);
        } else {
          toast.success('Verification email resent successfully');
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6 p-8 text-center'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold inline-flex items-center justify-center gap-2'>
          Email sent successfully{' '}
          <LuCircleCheckBig className='text-emerald-600' />
        </h1>
        <p className='text-sm text-muted-foreground'>
          We sent a verification link to{' '}
          <span className='font-medium text-foreground'>{email}</span>
        </p>
      </div>
      <span className='text-sm text-muted-foreground inline-flex items-center justify-center gap-0.5'>
        Didn&apos;t receive an email?
        <Button
          variant='link'
          className='p-0'
          size='sm'
          onClick={handleResend}
          disabled={isPending}
        >
          Resend verification email
        </Button>
      </span>
    </div>
  );
};

export default EmailVerificationNotice;
