'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import { IoAlertCircle } from 'react-icons/io5';
import QrCodeStepSkeleton from './qr-code-step-skeleton';
import { Field, FieldError, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { QRCode, QRCodeSvg } from '@/components/ui/qr-code';
import { Controller, useForm } from 'react-hook-form';
import { TwoFactorOTPFormData, twoFactorOTPSchema } from '@/schema/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import TwoFactorOTPInput from '@/components/two-factor-otp-input';
import { fetchBackupCodesAction } from '@/lib/actions/settings/fetch-backup-codes-action';

interface QrCodeStepProps {
  onNext: () => void;
  password: string;
  isSetupStep: boolean;
  setBackupCodes: (codes: string[]) => void;
}

const QrCodeStep = ({ onNext, password, isSetupStep, setBackupCodes }: QrCodeStepProps) => {
  const {
    data: qr,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ['two-factor-qr-code'],
    queryFn: async () => {
      const res = await authClient.twoFactor.getTotpUri({ password });
      if (res.error) {
        throw new Error(res.error.message || 'Failed to get QR code');
      }
      return res;
    },
    enabled: isSetupStep,
    staleTime: 0, // Cache the QR code until refetch is called
  });

  const form = useForm<TwoFactorOTPFormData>({
    resolver: zodResolver(twoFactorOTPSchema),
    defaultValues: {
      otp: '',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting: isPending },
  } = form;

  const onSubmit = async (data: TwoFactorOTPFormData) => {
    try {
      const { error } = await authClient.twoFactor.verifyTotp({ code: data.otp });
      if (error) {
        reset();
        refetch();
        toast.error(error.message || 'Invalid code. Please rescan the QR code and try again.');
        return;
      }
      const { success, message, backupCodes } = await fetchBackupCodesAction();
      if (!success) {
        toast.error(message || 'Could not load backup codes.');
        return;
      }
      setBackupCodes(backupCodes);
      onNext();
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className='gap-6'>
        <FieldSet>
          <FieldLegend className='data-[variant=legend]:text-base'>Scan the QR code:</FieldLegend>
        </FieldSet>
        {status === 'pending' ? (
          <QrCodeStepSkeleton />
        ) : status === 'error' ? (
          <Alert variant='error'>
            <IoAlertCircle />
            <AlertTitle>{error?.message}</AlertTitle>
          </Alert>
        ) : (
          <div className='flex flex-col items-center justify-center gap-5'>
            {/* QR code will be rendered here */}
            <QRCode value={qr.data.totpURI} size={180}>
              <QRCodeSvg />
            </QRCode>
            {/* 6 box input placeholder */}
            <Controller
              name='otp'
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <TwoFactorOTPInput value={field.value} onChange={field.onChange} isInvalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        )}
        <Button type='submit' disabled={isPending} className='self-end'>
          {isPending ? 'Activating...' : 'Activate'}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default QrCodeStep;
