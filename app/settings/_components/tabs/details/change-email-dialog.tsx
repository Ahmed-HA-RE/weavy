'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import { Spinner } from '@/components/ui/spinner';

const changeEmailSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
});

const ChangeEmailDialog = ({
  currentEmail,
  open,
  onOpenChange,
}: {
  currentEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof changeEmailSchema>>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof changeEmailSchema>) => {
    try {
      const res = await authClient.changeEmail({
        newEmail: data.email,
        callbackURL: '/settings?tab=details',
      });
      if (res.error) {
        throw new Error(res.error.message || 'Failed to change email');
      }
      toast.success('Please check your inbox to confirm the email change.');
      onOpenChange(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  const { handleSubmit, control, formState } = form;

  const { isSubmitting } = formState;
  // eslint-disable-next-line
  const isSameEmail = form.watch('email') === currentEmail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='p-6 sm:max-w-lg'>
        <DialogHeader className='text-center'>
          <DialogTitle className='text-xl'>Change Email</DialogTitle>
          <DialogDescription className='text-sm'>
            Enter your new email address below and we&apos;ll send you a confirmation email to verify the change.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className='grid gap-4 py-4'>
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Email
                    <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <Input type='email' id={field.name} {...field} placeholder='Enter your new email...' />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Button
              type='submit'
              className='self-end'
              disabled={isSameEmail || isSubmitting || !form.formState.isDirty}
            >
              {isSubmitting ? <Spinner /> : 'Confirm'}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailDialog;
