'use client';

import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  TwoFactorBackupCodeFormData,
  twoFactorBackupCodeSchema,
} from '@/schema/auth';

const TwoFactorBackupCodes = ({ callbackURL }: { callbackURL: string }) => {
  const router = useRouter();

  const form = useForm<TwoFactorBackupCodeFormData>({
    resolver: zodResolver(twoFactorBackupCodeSchema),
    defaultValues: {
      code: '',
      trustDevice: false,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting: isPending },
  } = form;

  const onSubmit = async (data: TwoFactorBackupCodeFormData) => {
    try {
      const { error } = await authClient.twoFactor.verifyBackupCode({
        code: data.code,
        trustDevice: data.trustDevice,
        disableSession: false,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className='gap-8'>
        <Controller
          name='code'
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                placeholder='Enter your backup codes...'
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* TrustDevice */}
        <Controller
          name='trustDevice'
          control={control}
          render={({ field }) => (
            <Field orientation='horizontal'>
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor={field.name}>Trust this device</FieldLabel>
            </Field>
          )}
        />
        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? <Spinner /> : 'Verify'}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default TwoFactorBackupCodes;
