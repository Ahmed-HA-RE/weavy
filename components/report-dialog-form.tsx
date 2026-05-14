'use client';

import { Control, Controller } from 'react-hook-form';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { formatReportReason } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { REPORT_REASON } from '@/lib/generated/prisma/enums';
import { ReportPostFormData } from '@/schema/post';
import { ReportUserFormData } from '@/schema/user';

type ReportDialogFormProps = {
  control: Control<ReportPostFormData | ReportUserFormData>;
  isSubmitting: boolean;
  isOtherReason: boolean;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
  userName?: string;
  type: 'USER' | 'POST';
};

const ReportDialogForm = ({
  control,
  isSubmitting,
  isOtherReason,
  onSubmit,
  userName,
  type,
}: ReportDialogFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>
          {type === 'USER' ? `Report ${userName}?` : 'Report Post?'}
        </DialogTitle>
        <DialogDescription>
          {`Help us keep the community safe by reporting any inappropriate ${type === 'USER' ? 'behavior from this user' : 'content'}.`}
        </DialogDescription>
      </DialogHeader>
      <FieldGroup className='my-6'>
        {/* Reason Field */}
        <Controller
          name='reason'
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Reason
                <span className='text-foreground'>*</span>
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger
                  id={field.name}
                  className='dark:!bg-background w-full'
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder='Select Reason Type' />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(REPORT_REASON).map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {formatReportReason(reason)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Message Field if the reason is "Other" */}
        {isOtherReason && (
          <Controller
            name='message'
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <span className='inline-flex justify-between items-center'>
                  <FieldLabel htmlFor={field.name}>
                    Additional Details
                  </FieldLabel>
                  <span className='text-xs text-muted-foreground'>
                    Optional
                  </span>
                </span>
                <Textarea
                  id={field.name}
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder='Provide more details about the issue'
                  aria-invalid={fieldState.invalid}
                  className='min-h-[100px]'
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        )}
        {/* Block User Field */}
        <Controller
          name='blockUser'
          control={control}
          render={({ field }) => (
            <Field orientation='horizontal'>
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                className='cursor-pointer'
              />
              <FieldLabel className='cursor-pointer' htmlFor={field.name}>
                Block User
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter>
        <DialogClose
          type='button'
          className='border px-3.5 py-2 rounded-md text-xs cursor-pointer'
        >
          Cancel
        </DialogClose>
        <Button type='submit' size={'sm'} disabled={isSubmitting}>
          {isSubmitting
            ? 'Reporting...'
            : type === 'USER'
              ? 'Report User'
              : 'Report Post'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ReportDialogForm;
