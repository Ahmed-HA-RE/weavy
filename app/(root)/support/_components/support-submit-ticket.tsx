'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { submitSupportTicket } from '@/lib/actions/support';
import { auth } from '@/lib/auth';
import {
  SupportSubmitTicketFormData,
  supportSubmitTicketSchema,
} from '@/schema/support';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SupportSubmitTicket = ({
  loggedUser,
}: {
  loggedUser?: typeof auth.$Infer.Session.user | null;
}) => {
  const isLoggedIn = !!loggedUser;

  const form = useForm<SupportSubmitTicketFormData>({
    resolver: zodResolver(supportSubmitTicketSchema),
    defaultValues: {
      name: loggedUser?.name || '',
      email: loggedUser?.email || '',
      subject: '',
      description: '',
    },
  });

  const onSubmit = async (data: SupportSubmitTicketFormData) => {
    const { success, message } = await submitSupportTicket(data);
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
    form.reset();
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting: isPending },
  } = form;

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight'>Submit a ticket</h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Fill out the form below and our support team will get back to you as
          soon as possible.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className='gap-5'>
          {/* Name */}
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Name
                  <span className='text-destructive'>*</span>
                </FieldLabel>
                <Input
                  id={field.name}
                  type='text'
                  placeholder='Your name'
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Email
                  <span className='text-destructive'>*</span>
                </FieldLabel>
                <Input
                  id={field.name}
                  type='email'
                  placeholder='youremail@email.com'
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Subject */}
          <Controller
            name='subject'
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Subject
                  <span className='text-destructive'>*</span>
                </FieldLabel>
                <Input
                  id={field.name}
                  type='text'
                  placeholder='Brief summary of your issue'
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            name='description'
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Description
                  <span className='text-destructive'>*</span>
                </FieldLabel>
                <Textarea
                  id={field.name}
                  placeholder='Describe your issue in detail (min. 50 characters)...'
                  aria-invalid={fieldState.invalid}
                  className='min-h-36'
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Submit */}
          {isLoggedIn ? (
            <Button
              type='submit'
              disabled={isPending}
              className='self-end min-w-36'
            >
              {isPending ? <Spinner /> : 'Submit Ticket'}
            </Button>
          ) : (
            <Button asChild className='self-end'>
              <Link href={`/sign-in?callbackURL=/support`}>
                Sign in to Submit
              </Link>
            </Button>
          )}
        </FieldGroup>
      </form>
    </div>
  );
};

export default SupportSubmitTicket;
