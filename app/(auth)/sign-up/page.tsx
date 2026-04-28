import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import SignUpForm from './_components/sign-up-form';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: `Create your account on ${APP_NAME} and start sharing your thoughts, connecting with friends, and exploring a world of engaging content. `,
};

const SignUpContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }

  return <SignUpForm />;
};

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpContent />
    </Suspense>
  );
};

export default SignUpPage;
