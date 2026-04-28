import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

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
};

const ForgotPasswordPage = () => {
  return (
    <Suspense>
      <ForgotPasswordContent />
    </Suspense>
  );
};

export default ForgotPasswordPage;
