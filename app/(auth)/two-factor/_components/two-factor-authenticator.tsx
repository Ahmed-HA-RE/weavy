'use client';

import { authClient } from '@/lib/auth-client';
import TwoFactorForm from './two-factor-form';
import { TwoFactorOTPFormData } from '@/schema/settings';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const TwoFactorAuthenticator = ({ callbackURL }: { callbackURL: string }) => {
  const router = useRouter();

  const onSubmit = async (data: TwoFactorOTPFormData) => {
    try {
      const { error } = await authClient.twoFactor.verifyTotp({
        code: data.otp,
        trustDevice: data.trustDevice,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success('Verified successfully');
      router.push(callbackURL);
    } catch {
      toast.error('An unexpected error occurred.');
    }
  };

  return <TwoFactorForm onSubmit={onSubmit} />;
};

export default TwoFactorAuthenticator;
