'use client';

import { Post } from '@/lib/generated/prisma/client';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { UpdatePostFormData, updatePostSchema } from '@/schema/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldError } from '@/components/ui/field';
import { updateMyPostAction } from '@/lib/actions/post/update-my-post-action';

type UpdatePostFormProps = {
  post: Pick<Post, 'id' | 'content' | 'image'>;
  setIsEdit: (value: boolean) => void;
};

const UpdatePostForm = ({ post, setIsEdit }: UpdatePostFormProps) => {
  const form = useForm<UpdatePostFormData>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      content: post.content,
      image: post.image,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: UpdatePostFormData) => {
    const res = await updateMyPostAction({ postId: post.id, data });

    if (res.success) {
      toast.success(res.message);
      setIsEdit(false);
    } else {
      toast.error(res.message);
      return;
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
      <Card className='py-6'>
        <CardContent className='flex flex-col gap-4'>
          {/* TextArea */}
          <Controller
            name='content'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Textarea
                  placeholder='Update content...'
                  aria-invalid={fieldState.invalid}
                  className='border-0 bg-transparent dark:bg-transparent p-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-0 aria-invalid:ring-0 min-h-[110px]'
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* @todo: add dropzone */}
        </CardContent>

        <CardFooter className='border-t flex items-center justify-between gap-2.5'>
          <Button
            type='button'
            className='text-muted-foreground gap-1.5'
            variant='ghost'
            size='sm'
          >
            <HiOutlinePhotograph className='size-4.5' />
            Replace
          </Button>

          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setIsEdit(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='min-w-[100px]'
            >
              {isSubmitting ? (
                <>
                  <Spinner className='size-4' />
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UpdatePostForm;
