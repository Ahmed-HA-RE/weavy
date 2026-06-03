'use client';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { TwoFactorOTPFormData, twoFactorOTPSchema } from '@/schema/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TwoFactorOTPInput from '@/components/two-factor-otp-input';
import { Checkbox } from '@/components/ui/checkbox';

const TwoFactorForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ otp: string; trustdevice?: boolean }>;
}) => {
  const form = useForm<TwoFactorOTPFormData>({
    resolver: zodResolver(twoFactorOTPSchema),
    defaultValues: {
      otp: '',
      trustDevice: false,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting: isPending },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className='gap-8'>
        <Controller
          name='otp'
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <TwoFactorOTPInput
                value={field.value}
                onChange={field.onChange}
                isInvalid={fieldState.invalid}
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

export default TwoFactorForm;
