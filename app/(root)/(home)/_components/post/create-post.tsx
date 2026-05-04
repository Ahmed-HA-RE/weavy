'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import { Suspense, useState, useTransition } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { LuSend } from 'react-icons/lu';
import { Spinner } from '@/components/ui/spinner';
import { createPostAction } from '@/lib/actions/post/create-post-action';
import { toast } from 'sonner';

const CreatePost = ({ user }: { user: typeof auth.$Infer.Session.user }) => {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState('');

  const onSubmit = (e: React.SubmitEvent) => {
    startTransition(async () => {
      e.preventDefault();
      const result = await createPostAction({ content, image });

      if (result.success) {
        setContent('');
        setImage('');
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className='py-6'>
        <CardContent className='flex gap-4 min-h-[110px]'>
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
          {/* TextArea */}
          <Textarea
            placeholder="What's on your mind?"
            className='border-0 bg-transparent dark:bg-transparent p-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-0 aria-invalid:ring-0 pt-1 '
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CardContent>
        <CardFooter className='border-t flex items-center justify-between gap-2.5'>
          <Button
            className='text-muted-foreground gap-1.5'
            variant='ghost'
            size='sm'
          >
            <HiOutlinePhotograph className='size-4.5' />
            Photo
          </Button>
          <Button
            disabled={isPending || (!content.trim() && !image)}
            type='submit'
            className='min-w-[90px]'
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <LuSend /> Post
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CreatePost;
