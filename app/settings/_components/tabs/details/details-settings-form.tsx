'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { User } from '@/lib/generated/prisma/client';
import { DetailsSettingsFormData, detailsSettingsSchema } from '@/schema/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
import SaveButton from '../../save-button';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Spinner } from '@/components/ui/spinner';
import { useValidateUsername } from '@/hooks/use-validate-username';
import { useRouter } from 'next/navigation';
import { updateUserDetailsAction } from '@/lib/actions/settings/update-user-details-action';
import { toast } from 'sonner';
import ChangeEmailDialog from './change-email-dialog';

type DetailsSettingsFormProps = {
  user: Pick<User, 'name' | 'displayName' | 'email' | 'bio' | 'website' | 'location'>;
};

// @todo tommorow enshaa Allah: add modal to change email, and start with account settings (change password, 2FA,Theme toggle etc..)

const DetailsSettingsForm = ({ user }: DetailsSettingsFormProps) => {
  const [openChangeEmailDialog, setOpenChangeEmailDialog] = useState(false);
  const router = useRouter();
  const form = useForm<DetailsSettingsFormData>({
    resolver: zodResolver(detailsSettingsSchema),
    defaultValues: {
      name: user.name,
      displayName: user.displayName || '',
      bio: user.bio || '',
      website: user.website?.replace('https://', '') || '',
      location: user.location || '',
    },
  });
  // eslint-disable-next-line
  const [value] = useDebounce(form.watch('name'), 400);

  const onSubmit = async (data: DetailsSettingsFormData) => {
    const res = await updateUserDetailsAction(data);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
      return;
    }
  };

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const { data, isFetching } = useValidateUsername({
    value,
    username: user.name,
  });

  useEffect(() => {
    if (data && !data.success) {
      form.setError('name', {
        message: data.message,
      });
    } else {
      form.clearErrors('name');
    }
  }, [data, form]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className='gap-8'>
          {/* Desktop Save Button */}
          <SaveButton mode='desktop' isSubmitting={isSubmitting} />
          {/* UserName + DisplayName */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      placeholder='Enter your name...'
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {isFetching && (
                      <InputGroupAddon align='inline-end'>
                        <Spinner />
                      </InputGroupAddon>
                    )}
                  </InputGroup>

                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='displayName'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder='Enter your display name...'
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
          {/* Email */}
          <Field>
            <span className='flex items-center justify-between'>
              <FieldLabel>Email</FieldLabel>
              <Button size='sm' variant='secondary' type='button' onClick={() => setOpenChangeEmailDialog(true)}>
                Change
              </Button>
            </span>
            <Input disabled value={user.email} />
          </Field>

          {/* Bio */}
          <Controller
            name='bio'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                <Textarea
                  id={field.name}
                  placeholder='Enter your bio...'
                  {...field}
                  className='min-h-[150px] '
                  aria-invalid={fieldState.invalid}
                />
                <p className='text-xs text-muted-foreground mt-1 text-right'>
                  A short bio about yourself. Max 160 characters.
                </p>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* Website + Location */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Controller
              name='website'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Website</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id={field.name}
                      placeholder='yourwebsite.com'
                      aria-invalid={fieldState.invalid}
                      className='!pl-0.5'
                      {...field}
                    />
                  </InputGroup>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='location'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                  <Input id={field.name} placeholder='e.g. Dubai, UAE' {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
          {/* Mobile Save Button */}
          <SaveButton mode='mobile' isSubmitting={isSubmitting} />
        </FieldGroup>
      </form>
      <ChangeEmailDialog
        open={openChangeEmailDialog}
        onOpenChange={setOpenChangeEmailDialog}
        currentEmail={user.email}
      />
    </>
  );
};

export default DetailsSettingsForm;
