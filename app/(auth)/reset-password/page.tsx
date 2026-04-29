import { Suspense } from 'react';
import AuthWrapper from '../_components/auth-wrapper';
import { redirect } from 'next/navigation';
import ResetPasswordForm from './_components/reset-password-form';

export const metadata = {
  title: 'Reset Password',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ResetPasswordContent = async ({ searchParams }: Props) => {
  const { error, token } = await searchParams;

  if (error || !token) {
    return redirect('/forgot-password');
  }

  return <ResetPasswordForm token={token} />;
};

const ResetPasswordPage = ({ searchParams }: Props) => {
  return (
    <AuthWrapper
      title='Reset Password'
      subtitle='Enter your new password below'
    >
      <Suspense>
        <ResetPasswordContent searchParams={searchParams} />
      </Suspense>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
