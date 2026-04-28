import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import SignUpForm from './_components/sign-up-form';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: `Create your account on ${APP_NAME} and start sharing your thoughts, connecting with friends, and exploring a world of engaging content. `,
};

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
