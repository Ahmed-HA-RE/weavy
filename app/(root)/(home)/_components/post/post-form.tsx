'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { LuSend } from 'react-icons/lu';
import { Spinner } from '@/components/ui/spinner';
import { createPostAction } from '@/lib/actions/post/create-post-action';
import { toast } from 'sonner';
import Dropzone from '@/components/dropzone';
import { AnimatePresence, motion } from 'motion/react';
import { useForm, Controller } from 'react-hook-form';
import { PostFormData, postSchema } from '@/schema/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup, Field } from '@/components/ui/field';
import { IoClose } from 'react-icons/io5';
import { updateMyPostAction } from '@/lib/actions/post/update-my-post-action';
import { useQueryClient } from '@tanstack/react-query';

type PostFormProps = {
  user?: typeof auth.$Infer.Session.user;
  post?: {
    id: string;
    content: string | null;
    image: string | null;
    imageKey: string | null;
  };
  isEdit?: boolean;
  setIsEdit?: (value: boolean) => void;
};

const PostForm = ({ user, post, isEdit, setIsEdit }: PostFormProps) => {
  const queryClient = useQueryClient();
  const [isUploadImage, setIsUploadImage] = useState(false);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: post?.content ?? '',
      image: post?.image ?? null,
      imageKey: post?.imageKey ?? null,
    },
  });

  const { control, handleSubmit, reset } = form;
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: PostFormData) => {
    const result = isEdit
      ? await updateMyPostAction({ data, postId: post?.id as string })
      : await createPostAction(data);

    if (result.success) {
      reset();
      setIsUploadImage(false);
      if (setIsEdit) setIsEdit(false);
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <FieldGroup>
        <Card>
          <CardContent className='flex flex-col gap-6 min-h-[110px]'>
            <div className='flex gap-4'>
              {!isEdit && user && (
                <Avatar size='lg'>
                  <Suspense
                    fallback={
                      <AvatarFallback className='uppercase'>
                        {user.name.slice(0, 2)}
                      </AvatarFallback>
                    }
                  >
                    <Image
                      src={user.image ?? '/images/avatar.png'}
                      alt={user.name}
                      width={40}
                      height={40}
                      className='rounded-full object-cover'
                    />
                  </Suspense>
                </Avatar>
              )}
              {/* TextArea */}
              <Controller
                name='content'
                control={control}
                render={({ field }) => (
                  <Field>
                    <Textarea
                      placeholder="What's on your mind?"
                      className='border-0 bg-transparent dark:bg-transparent p-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-0 aria-invalid:ring-0 pt-2'
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </Field>
                )}
              />
            </div>
            <AnimatePresence>
              {isUploadImage && (
                <Controller
                  name='image'
                  control={control}
                  render={({ field }) =>
                    field.value ? (
                      <div className='relative w-full aspect-video rounded-md'>
                        <Image
                          src={field.value}
                          alt='Uploaded'
                          className='rounded-md'
                          fill
                        />
                        <Button
                          type='button'
                          className='absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full'
                          size={'icon-sm'}
                          onClick={() => {
                            field.onChange(null);
                            form.setValue('imageKey', null);
                          }}
                        >
                          <IoClose />
                        </Button>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeIn' }}
                      >
                        <Field>
                          <Dropzone
                            onChange={({ url, key }) => {
                              field.onChange(url);
                              form.setValue('imageKey', key);
                            }}
                            endpoint='postImage'
                          />
                        </Field>
                      </motion.div>
                    )
                  }
                />
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className='border-t flex items-center justify-between gap-2.5'>
            <Button
              className={`gap-1.5 ${!isUploadImage ? 'text-muted-foreground' : ''}`}
              variant={isUploadImage ? 'destructive' : 'ghost'}
              size='sm'
              type='button'
              onClick={() => {
                setIsUploadImage(!isUploadImage);
                form.setValue('image', null);
                form.setValue('imageKey', null);
              }}
            >
              {isUploadImage ? (
                'Cancel'
              ) : (
                <>
                  <HiOutlinePhotograph className='size-4.5' />
                  {isEdit ? 'Replace' : 'Photo'}
                </>
              )}
            </Button>
            <div className='flex items-center gap-2'>
              {isEdit && setIsEdit && (
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsEdit(false)}
                  disabled={isSubmitting}
                >
                  Dismiss
                </Button>
              )}
              <Button
                disabled={isSubmitting || !isValid}
                type='submit'
                className='min-w-[90px]'
              >
                {isSubmitting ? (
                  <Spinner />
                ) : isEdit ? (
                  'Update'
                ) : (
                  <>
                    {' '}
                    <LuSend /> Post
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </FieldGroup>
    </form>
  );
};

export default PostForm;
