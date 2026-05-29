'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { setPasswordAction } from '@/lib/actions/settings/set-password-action';
import { authClient } from '@/lib/auth-client';
import { ChangePasswordFormData, changePasswordSchema, SetPasswordFormData, setPasswordSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Control, Controller, FieldValues, Path, useForm } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa6';
import { RiEyeCloseLine } from 'react-icons/ri';
import { toast } from 'sonner';

interface SharedPasswordFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  isCredentialProvider?: boolean;
  loggedUserEmail?: string;
}

const SharedPasswordField = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  isCredentialProvider,
  loggedUserEmail,
}: SharedPasswordFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleForgotPassword = () => {
    startTransition(async () => {
      try {
        const { error } = await authClient.requestPasswordReset({
          email: loggedUserEmail!,
          redirectTo: '/reset-password',
        });
        if (error) throw new Error(error.message || 'Failed to send password reset email. Please try again.');
        toast.success('An email sent! Please check your inbox.');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <span className='flex items-center justify-between'>
            <FieldLabel htmlFor={field.name}>
              {label}
              <span className='text-destructive'>*</span>
            </FieldLabel>
            {isCredentialProvider && (
              <Button
                type='button'
                size='sm'
                variant='link'
                className='text-primary hover:underline self-end no-underline'
                onClick={handleForgotPassword}
                disabled={isPending}
              >
                forgot password?
              </Button>
            )}
          </span>
          <InputGroup>
            <InputGroupInput
              id={field.name}
              type={isVisible ? 'text' : 'password'}
              aria-invalid={fieldState.invalid}
              {...field}
              placeholder={placeholder || '*******'}
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
  );
};

const SetPasswordForm = () => {
  const router = useRouter();

  const form = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SetPasswordFormData) => {
    const res = await setPasswordAction(data);
    if (!res.success) {
      toast.error(res.message);
      return;
    } else {
      toast.success(res.message);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className='gap-6'>
        <SharedPasswordField
          name='password'
          label='New Password'
          control={control}
          placeholder='Enter a unique password'
        />
        <SharedPasswordField name='confirmPassword' label='Confirm Password' control={control} />
        <Button type='submit' className='self-end min-w-28' disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Set Password'}
        </Button>
      </FieldGroup>
    </form>
  );
};

const ChangePasswordForm = ({ loggedUserEmail }: { loggedUserEmail: string }) => {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const { newPassword, currentPassword } = data;
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });
      if (error) throw new Error(error.message || 'Failed to change password. Please try again.');
      toast.success('Password changed successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className='gap-6'>
        <SharedPasswordField
          name='currentPassword'
          label='Current Password'
          control={control}
          isCredentialProvider={true}
          loggedUserEmail={loggedUserEmail}
        />
        <SharedPasswordField name='newPassword' label='New Password' control={control} />
        <SharedPasswordField name='confirmNewPassword' label='Confirm New Password' control={control} />
        <Button type='submit' className='self-end min-w-28' disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Change Password'}
        </Button>
      </FieldGroup>
    </form>
  );
};

interface PasswordSettingsProps {
  isCredentialProvider: boolean;
  loggedUserEmail: string;
}
const PasswordSettings = ({ isCredentialProvider, loggedUserEmail }: PasswordSettingsProps) => {
  if (!isCredentialProvider) {
    return <SetPasswordForm />;
  }

  return <ChangePasswordForm loggedUserEmail={loggedUserEmail} />;
};

export default PasswordSettings;
