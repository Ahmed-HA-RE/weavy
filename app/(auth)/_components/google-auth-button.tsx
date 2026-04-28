'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

const GoogleAuthButton = ({ callbackURL }: { callbackURL: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGoogleAuth = () => {
    startTransition(async () => {
      try {
        const { data, error } = await authClient.signIn.social({
          provider: 'google',
          callbackURL,
        });
        if (error) {
          throw new Error(error?.message);
        } else if (data && data.url) {
          router.push(data.url);
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
    <Button
      variant='outline'
      type='button'
      className='gap-1'
      onClick={handleGoogleAuth}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <FcGoogle className='size-5' />
          Google
        </>
      )}
    </Button>
  );
};

export default GoogleAuthButton;
