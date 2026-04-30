import AuthWrapper from '../_components/auth-wrapper';
import { redirect } from 'next/navigation';
import ResetPasswordForm from './_components/reset-password-form';

export const metadata = {
  title: 'Reset Password',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ResetPasswordPage = async ({ searchParams }: Props) => {
  const { error, token } = await searchParams;

  if (error || !token) {
    return redirect('/forgot-password');
  }
  return (
    <AuthWrapper
      title='Reset Password'
      subtitle='Enter your new password below'
    >
      <ResetPasswordForm token={token} />
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
