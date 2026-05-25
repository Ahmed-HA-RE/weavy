'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { User } from '@/lib/generated/prisma/client';
import {
  DetailsSettingsFormData,
  detailsSettingsSchema,
} from '@/schema/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import SaveButton from '../../save-button';

type DetailsSettingsFormProps = {
  user: Pick<
    User,
    'name' | 'displayName' | 'email' | 'bio' | 'website' | 'location'
  >;
};

const DetailsSettingsForm = ({ user }: DetailsSettingsFormProps) => {
  const form = useForm<DetailsSettingsFormData>({
    resolver: zodResolver(detailsSettingsSchema),
    defaultValues: {
      name: user.name,
      displayName: user.displayName || '',
      email: user.email,
      bio: user.bio || '',
      website: user.website || '',
      location: user.location || '',
    },
  });

  const onSubmit = (data: DetailsSettingsFormData) => {
    console.log(data);
  };

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  return (
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
                <Input
                  id={field.name}
                  placeholder='Enter your name...'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
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
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <span className='flex items-center justify-between'>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Button size='sm' variant='secondary' type='button'>
                  Change
                </Button>
              </span>
              <Input
                id={field.name}
                placeholder='Enter your email...'
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                    placeholder='yourwebsite.com'
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className='!pl-0.5'
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
                <Input
                  id={field.name}
                  placeholder='Enter your location...'
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
        {/* Mobile Save Button */}
        <SaveButton mode='mobile' isSubmitting={isSubmitting} />
      </FieldGroup>
    </form>
  );
};

export default DetailsSettingsForm;
