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
import { type SignInFormData, signInSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import GoogleAuthButton from '../../_components/google-auth-button';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { MdOutlineErrorOutline } from 'react-icons/md';

const SignInForm = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const callbackURL = useSearchParams().get('callbackURL') || '/';

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL,
      });

      if (error) {
        throw new Error(error.message);
      } else {
        toast.success('Signed in successfully! Redirecting...');
        router.push(callbackURL);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      form.setError('root', {
        message:
          errorMessage === 'Email not verified'
            ? 'Please verify your email before signing in.'
            : errorMessage,
      });
    }
  };

  const handleResendVerification = async () => {
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: form.getValues('email'),
        callbackURL: `/verify-email?callbackURL=${encodeURIComponent(callbackURL)}`,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        toast.success('Verification email resent! Please check your inbox.');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  const { isSubmitting, errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className='gap-4 w-full'>
        {errors.root && errors.root.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='my-1.5'
          >
            <Alert variant='error'>
              <MdOutlineErrorOutline />
              <AlertTitle>
                {errors.root.message}{' '}
                {errors.root.message ===
                  'Please verify your email before signing in.' && (
                  <Button
                    type='button'
                    className='underline p-0 text-xs hover:bg-transparent hover:text-red-700'
                    variant={'ghost'}
                    size='sm'
                    onClick={handleResendVerification}
                  >
                    Resend Email
                  </Button>
                )}
              </AlertTitle>
            </Alert>
          </motion.div>
        )}
        {/* OAuth Provider */}
        <Field>
          <GoogleAuthButton callbackURL={callbackURL} />
        </Field>
        <FieldSeparator className='my-2'>Or continue with Email</FieldSeparator>
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
              <div className='flex items-center justify-between'>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Link
                  href={'/forgot-password'}
                  className='text-xs text-blue-500 hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
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
          {isSubmitting ? <Spinner /> : 'Sign In'}
        </Button>
        <span className='text-base'>
          Don&apos;t have an account?{' '}
          <Link
            className='text-blue-500 font-semibold'
            href={`/sign-up?callbackURL=${encodeURIComponent(callbackURL)}`}
          >
            Sign Up
          </Link>
        </span>
      </FieldGroup>
    </form>
  );
};

export default SignInForm;
