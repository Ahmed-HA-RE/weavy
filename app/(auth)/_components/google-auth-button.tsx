'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const GoogleAuthButton = ({ callbackURL }: { callbackURL: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const lastMethod = authClient.getLastUsedLoginMethod();
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
      className='gap-1 relative'
      onClick={handleGoogleAuth}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <FcGoogle className='size-5' />
          Google
          {lastMethod === 'google' && pathname === '/sign-in' && (
            <Badge
              variant='default'
              className='absolute -top-2 -right-2 bg-linear-to-r from-[#48c6ef] to-[#6f86d6] '
            >
              Last Used
            </Badge>
          )}
        </>
      )}
    </Button>
  );
};

export default GoogleAuthButton;
