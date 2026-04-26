'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldGroup,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { authSchema, SignUpFormData } from '@/schema/auth';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import Link from 'next/link';

const SignUpForm = () => {
  const [visible, setVisible] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  const { isSubmitting } = form.formState;

  return (
    <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className='gap-6'>
        {/* User Name  */}
        <Controller
          control={form.control}
          name='userName'
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Username</FieldLabel>
              <Input
                id={field.name}
                type='text'
                aria-invalid={fieldState.invalid}
                inputSize='lg'
                {...field}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Email  */}
        <Controller
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
              <Input
                id={field.name}
                type='email'
                aria-invalid={fieldState.invalid}
                inputSize='lg'
                {...field}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Password  */}
        <Controller
          control={form.control}
          name='password'
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <InputGroup size='lg'>
                <InputGroupInput
                  id={field.name}
                  type={visible ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  inputSize='lg'
                  {...field}
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
      </FieldGroup>
      {/* @todo: Add recaptcha here */}

      <Button
        type='submit'
        disabled={isSubmitting}
        className='w-full max-w-[272px] h-16 text-[22px] rounded-full'
      >
        {isSubmitting ? 'Creating Account...' : 'Create an account'}
      </Button>
      <span className='text-muted-foreground max-w-lg mx-auto text-center block'>
        By creating an account, you agree to our{' '}
        <Link
          href='/terms-and-conditions'
          className='underline text-foreground'
        >
          Terms & Conditions
        </Link>{' '}
        and{' '}
        <Link href='/privacy-policy' className='underline text-foreground'>
          Privacy Policy
        </Link>
      </span>
    </form>
  );
};

export default SignUpForm;
