import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import SignUpForm from './_components/sign-up-form';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthWrapper from '../_components/auth-wrapper';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: `Create your account on ${APP_NAME} and start sharing your thoughts, connecting with friends, and exploring a world of engaging content. `,
};

const SignUpPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }
  return (
    <AuthWrapper
      title='Create your account'
      subtitle={`Connect to ${APP_NAME} with:`}
    >
      <SignUpForm />
    </AuthWrapper>
  );
};

export default SignUpPage;
