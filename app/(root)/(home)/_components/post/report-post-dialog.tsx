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
import { reportPostAction } from '@/lib/actions/post/report-post-action';
import { REPORT_REASON } from '@/lib/generated/prisma/enums';
import { formatReportReason } from '@/lib/utils';
import { type ReportPostFormData, reportPostSchema } from '@/schema/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TbMessageReport } from 'react-icons/tb';
import { toast } from 'sonner';

const ReportPostDialog = ({
  reporterId,
  postId,
}: {
  reporterId: string;
  postId: string;
}) => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<ReportPostFormData>({
    resolver: zodResolver(reportPostSchema),
    defaultValues: {
      reason: undefined,
      message: null,
      blockUser: false,
      reporterId,
      postId,
    },
  });

  const onSubmit = async (data: ReportPostFormData) => {
    const res = await reportPostAction(data);
    if (res.success) {
      form.reset();
      setOpenDialog(false);
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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
        <Button variant='ghost' size='sm'>
          <TbMessageReport />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg ring-0 dark:ring-1'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Report Post</DialogTitle>
            <DialogDescription>
              Help us keep the community safe by reporting any inappropriate
              content.
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
              {isSubmitting ? 'Reporting...' : 'Report Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPostDialog;
