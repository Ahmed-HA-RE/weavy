import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import AuthWrapper from '../_components/auth-wrapper';
import ForgotPasswordForm from './_components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description:
    'Forgot your password? No worries, we got you covered. Enter your email address and we will send you a link to reset your password.',
};

const ForgotPasswordContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/');
  }
  return <ForgotPasswordForm />;
};

const ForgotPasswordPage = () => {
  return (
    <AuthWrapper
      title='Forgot Password?'
      subtitle='Enter your email address to reset your password.'
    >
      <Suspense>
        <ForgotPasswordContent />
      </Suspense>
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
