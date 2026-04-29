'use client';

import { resetPasswordSchema, type ResetPasswordFormData } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await authClient.resetPassword(
        {
          newPassword: data.password,
          token,
        },
        {
          onSuccess: () => {
            form.reset();
            toast.success('Password reset successfully!');
            router.push('/sign-in');
          },
          onError: (ctx) => {
            const errorMessage =
              ctx.error.message ||
              'Failed to reset password. Please try again.';
            toast.error(errorMessage);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Password  */}
        <Controller
          control={form.control}
          name='password'
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  type={isVisible ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder='Enter a unique password'
                />
                <InputGroupAddon align='inline-end'>
                  <InputGroupButton
                    size='icon-sm'
                    aria-label='Toggle Password Visibility'
                    title='Toggle Password Visibility'
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? <RiEyeCloseLine /> : <FaRegEye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Confirm Password  */}
        <Controller
          control={form.control}
          name='confirmPassword'
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder='Confirm your password'
                />
                <InputGroupAddon align='inline-end'>
                  <InputGroupButton
                    size='icon-sm'
                    aria-label='Toggle Password Visibility'
                    title='Toggle Password Visibility'
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <RiEyeCloseLine />
                    ) : (
                      <FaRegEye />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
        </Button>
        <Button variant='ghost' asChild>
          <Link href='/sign-in'>Back to Sign In</Link>
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
