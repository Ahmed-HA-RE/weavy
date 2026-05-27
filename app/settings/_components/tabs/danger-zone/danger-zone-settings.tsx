'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { DANGER_ZONE_CONFIRMATION_TEXTS } from '@/lib/constants/app';
import { DangerZoneSettingsFormData, dangerZoneSettingsSchema } from '@/schema/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const DangerZoneSettings = () => {
  const form = useForm<DangerZoneSettingsFormData>({
    resolver: zodResolver(dangerZoneSettingsSchema),
    defaultValues: {
      firstConfirmation: false,
      secondConfirmation: false,
      thirdConfirmation: false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (data: DangerZoneSettingsFormData) => {
    if (!data.firstConfirmation || !data.secondConfirmation || !data.thirdConfirmation) {
      form.setError('root', { message: 'You must check all the boxes to proceed.' });
      return;
    } else {
      try {
        const res = await authClient.deleteUser();
        if (res.error) {
          throw new Error(res.error.message);
        } else {
          toast.success('We sent you a confirmation email. Please check your inbox.');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <p className='text-muted-foreground text-sm font-medium'>
        You must check all the boxes below to proceed with this action:
      </p>
      {/* Confirmation checkboxes */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className='gap-2'>
          {/* Confirmation 1 */}
          <Controller
            name='firstConfirmation'
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation='horizontal'>
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel htmlFor={field.name}>{DANGER_ZONE_CONFIRMATION_TEXTS.confirmation1}</FieldLabel>
              </Field>
            )}
          />
          {/* Confirmation 2 */}
          <Controller
            name='secondConfirmation'
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation='horizontal'>
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel htmlFor={field.name}>{DANGER_ZONE_CONFIRMATION_TEXTS.confirmation2}</FieldLabel>
              </Field>
            )}
          />
          {/* Confirmation 3 */}
          <Controller
            name='thirdConfirmation'
            control={control}
            render={({ field, fieldState }) => (
              <Field orientation='horizontal'>
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel htmlFor={field.name}>{DANGER_ZONE_CONFIRMATION_TEXTS.confirmation3}</FieldLabel>
              </Field>
            )}
          />
          {errors.root && <p className='text-destructive text-sm mt-2'>{errors.root.message}</p>}
        </FieldGroup>
        <Button type='submit' variant='destructive' disabled={isSubmitting} className='mt-6 w-full'>
          {isSubmitting ? 'Processing...' : 'Delete Account'}
        </Button>
      </form>
    </div>
  );
};

export default DangerZoneSettings;
