'use client';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyPasswordFormData, verifyPasswordSchema } from '@/schema/settings';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa6';
import { useState } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { APP_NAME } from '@/lib/constants/app';

const VerifyStep = ({ onNext, setPassword }: { onNext: () => void; setPassword: (password: string) => void }) => {
  const [visible, setVisible] = useState(false);

  const form = useForm<VerifyPasswordFormData>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting: isPending },
  } = form;

  const onSubmit = async (data: VerifyPasswordFormData) => {
    try {
      const { error } = await authClient.twoFactor.enable({
        password: data.password,
        issuer: APP_NAME,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        setPassword(data.password);
        onNext();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className='gap-6'>
        <FieldSet className='items-center text-center'>
          <FieldLegend className='data-[variant=legend]:text-base'>Verify Your Identity</FieldLegend>
          <FieldDescription>Enter your password to confirm it&apos;s you before enabling 2FA.</FieldDescription>
        </FieldSet>
        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  type={visible ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder='********'
                />
                <InputGroupAddon align='inline-end'>
                  <InputGroupButton
                    size='icon-sm'
                    aria-label='Toggle Password Visibility'
                    title='Toggle Password Visibility'
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <RiEyeCloseLine /> : <FaRegEye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type='submit' className='self-end' disabled={isPending}>
          {isPending ? 'Verifying...' : 'Verify'}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default VerifyStep;
