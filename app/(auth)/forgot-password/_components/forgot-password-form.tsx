'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await authClient.requestPasswordReset(
        {
          email: data.email,
          redirectTo: '/reset-password',
        },
        {
          onSuccess() {
            toast.success('Email sent! Please check your inbox.');
            router.push('/sign-in');
          },
          onError(ctx) {
            toast.error(ctx.error.message);
          },
        },
      );

      // toast.success('Email sent! Please check your inbox.');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <form className='w-full max-w-sm' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
        <Button
          asChild
          variant='ghost'
          className='p-0 hover:bg-muted hover:text-foreground'
        >
          <Link href='/sign-in'>Back to Sign In</Link>
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ForgotPasswordForm;
