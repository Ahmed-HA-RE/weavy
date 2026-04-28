import MailUnverified from '@/components/icons/mail-unverified';
import MailVerified from '@/components/icons/mail-verified';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Account Verification',
  description: `Check the verification status of your ${APP_NAME} account.`,
};

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const VerifyEmailContent = async ({ searchParams }: Props) => {
  const { callbackURL, error } = await searchParams;
  return (
    <div className='flex flex-col items-center justify-center gap-6 p-6 text-center min-h-[100vh]'>
      {error ? (
        <MailUnverified className='size-16' />
      ) : (
        <MailVerified className='size-16' />
      )}
      <div className='space-y-2'>
        <h1 className='text-2xl md:text-3xl font-semibold'>
          {error ? 'Email Verification Failed' : 'Email Verified Successfully!'}
        </h1>
        <p className='text-sm text-muted-foreground max-w-md mx-auto'>
          {error
            ? 'Either the verification link has expired or there was an error processing your request.'
            : 'Your email has been verified.'}
        </p>
      </div>
      <Button asChild className='group inline-flex ' size='default'>
        <Link href={error ? '/sign-up' : callbackURL || '/'}>
          {error ? 'Return to Sign Up' : 'Continue'}
          <FaArrowRightLong className='size-3.5 group-hover:translate-x-1 transition-transform' />
        </Link>
      </Button>
    </div>
  );
};

const VerifyEmailPage = ({ searchParams }: Props) => {
  return (
    <Suspense>
      <VerifyEmailContent searchParams={searchParams} />
    </Suspense>
  );
};

export default VerifyEmailPage;
