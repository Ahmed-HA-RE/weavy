'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { setPasswordAction } from '@/lib/actions/settings/set-password-action';
import { ChangePasswordFormData, changePasswordSchema, SetPasswordFormData, setPasswordSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
}

const SharedPasswordField = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  isCredentialProvider,
}: SharedPasswordFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);

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

const ChangePasswordForm = () => {
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

  const onSubmit = async (data: ChangePasswordFormData) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className='gap-6'>
        <SharedPasswordField
          name='currentPassword'
          label='Current Password'
          control={control}
          isCredentialProvider={true}
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
  loggedUserId: string;
}
const PasswordSettings = ({ isCredentialProvider, loggedUserId }: PasswordSettingsProps) => {
  if (!isCredentialProvider) {
    return <SetPasswordForm />;
  }

  return <ChangePasswordForm />;
};

export default PasswordSettings;
