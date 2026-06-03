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
        throw new Error(error.message);
      }
      toast.success('Verified successfully');
      router.push(callbackURL);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  return <TwoFactorForm onSubmit={onSubmit} />;
};

export default TwoFactorAuthenticator;
