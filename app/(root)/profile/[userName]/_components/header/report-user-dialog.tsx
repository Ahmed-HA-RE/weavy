'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { reportUserAction } from '@/lib/actions/user/report-user-action';
import { REPORT_REASON } from '@/lib/generated/prisma/enums';
import { formatReportReason } from '@/lib/utils';
import { type ReportUserFormData, reportUserSchema } from '@/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoFlag } from 'react-icons/io5';
import { toast } from 'sonner';

const ReportUserDialog = ({
  reporterId,
  reportedUser,
}: {
  reporterId: string;
  reportedUser: {
    id: string;
    name: string;
  };
}) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<ReportUserFormData>({
    resolver: zodResolver(reportUserSchema),
    defaultValues: {
      reason: undefined,
      message: null,
      blockUser: false,
      reporterId,
      reportedId: reportedUser.id,
    },
  });

  const onSubmit = async (data: ReportUserFormData) => {
    const res = await reportUserAction(data);
    if (res.success) {
      form.reset();
      setOpenDialog(false);
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
      return;
    }
  };

  const { control, handleSubmit } = form;
  const { isSubmitting } = form.formState;

  // eslint-disable-next-line
  const isOtherReason = form.watch('reason') === 'OTHER';

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='px-2 h-8 hover:bg-accent hover:text-accent-foreground w-full justify-start'
        >
          <IoFlag />
          Report User
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg ring-0 dark:ring-1'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Report {reportedUser.name}</DialogTitle>
            <DialogDescription>
              Help us keep the community safe by reporting any inappropriate
              behavior from {reportedUser.name}.
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
              control={form.control}
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
              {isSubmitting ? 'Reporting...' : `Report ${reportedUser.name}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUserDialog;
