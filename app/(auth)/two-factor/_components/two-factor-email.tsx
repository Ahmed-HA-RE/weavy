'use client';

import { authClient } from '@/lib/auth-client';
import TwoFactorForm from './two-factor-form';
import { TwoFactorOTPFormData } from '@/schema/settings';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { MdOutlineEmail } from 'react-icons/md';

const TwoFactorEmail = ({ callbackURL }: { callbackURL: string }) => {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      const { error } = await authClient.twoFactor.sendOtp();
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = async (data: TwoFactorOTPFormData) => {
    try {
      const { error } = await authClient.twoFactor.verifyOtp({
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

  if (!otpSent) {
    return (
      <Button onClick={handleSendOtp} disabled={isSending} className='w-full'>
        {isSending ? (
          <Spinner />
        ) : (
          <>
            <MdOutlineEmail className='size-5' />
            Send OTP by Email
          </>
        )}
      </Button>
    );
  }

  return <TwoFactorForm onSubmit={onSubmit} />;
};

export default TwoFactorEmail;
