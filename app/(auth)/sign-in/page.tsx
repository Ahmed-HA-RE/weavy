import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import SignInForm from './_components/sign-in-form';
import AuthWrapper from '../_components/auth-wrapper';

export const metadata: Metadata = {
  title: 'Sign In',
  description: `Sign in to your account on ${APP_NAME} and start sharing your thoughts, connecting with friends, and exploring a world of engaging content. `,
};

const SignInContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }

  return <SignInForm />;
};

const SignInPage = () => {
  return (
    <AuthWrapper
      title='Sign in to your account'
      subtitle={`Connect to ${APP_NAME} with:`}
    >
      <Suspense>
        <SignInContent />
      </Suspense>
    </AuthWrapper>
  );
};

export default SignInPage;
