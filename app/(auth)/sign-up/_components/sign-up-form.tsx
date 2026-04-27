'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { authSchema, type SignUpFormData } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
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
  });

  const onSubmit = (data: SignUpFormData) => {};

  const { isSubmitting } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* OAuth Providers */}
      <Button variant='outline' type='button' className='w-full'>
        <FcGoogle className='size-5' />
        Google
      </Button>
      <FieldSeparator className='mt-6 mb-6'>
        Or continue with Email
      </FieldSeparator>
      <FieldGroup className='gap-4'>
        {/* Username */}
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
                {...field}
                placeholder='Enter your username'
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
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                type='email'
                aria-invalid={fieldState.invalid}
                {...field}
                placeholder='youremail@email.com'
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
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  type={visible ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder='Enter a unique password'
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
        <Button type='submit' className='w-full' disabled={isSubmitting}>
          Sign Up
        </Button>
        <small className='text-xs text-muted-foreground max-w-sm '>
          By creating an account you agree to the{' '}
          <Link
            className='text-foreground underline font-semibold'
            href='/terms'
          >
            Terms of Service
          </Link>{' '}
          and our{' '}
          <Link
            className='text-foreground underline font-semibold'
            href='/privacy'
          >
            Privacy Policy
          </Link>
          .
        </small>
        <span className='text-base'>
          Already have an account?{' '}
          <Link className='text-blue-500 font-semibold' href='/sign-in'>
            Sign In
          </Link>
        </span>
      </FieldGroup>
    </form>
  );
};

export default SignUpForm;
