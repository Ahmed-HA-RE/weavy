'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Suspense, TransitionStartFunction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { addComment } from '@/lib/actions/post/add-comment';
import { auth } from '@/lib/auth';
import { Prisma } from '@/lib/generated/prisma/client';

type AddCommentProps = {
  postId: string;
  user: typeof auth.$Infer.Session.user;
  startTransition: TransitionStartFunction;
  isPending: boolean;
  setIsCommenting: (value: boolean) => void;
  addOptimisticComment: (
    action: Prisma.CommentGetPayload<{
      select: {
        content: true;
        createdAt: true;
        id: true;
        user: {
          select: {
            id: true;
            name: true;
            displayName: true;
            image: true;
            role: true;
          };
        };
      };
    }>,
  ) => void;
};

const AddComment = ({
  user,
  postId,
  startTransition,
  setIsCommenting,
  addOptimisticComment,
}: AddCommentProps) => {
  const [content, setContent] = useState('');

  const handleAddComment = () => {
    setIsCommenting(false);

    startTransition(async () => {
      addOptimisticComment({
        id: crypto.randomUUID(),
        content,
        user: {
          id: user.id,
          name: user.name,
          displayName: user.displayName || user.name,
          image: user.image || '/images/avatar.png',
          role: user.role,
        },
        createdAt: new Date(),
      });

      const res = await addComment({ postId, content });
      if (!res.success) {
        toast.error(res.message);
        setContent(content);
        setIsCommenting(true);
        return;
      }
    });
  };

  return (
    <motion.div
      className='border-t px-4 pt-6 text-sm'
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div className='flex gap-4'>
        <Avatar className='size-9'>
          <Suspense
            fallback={<AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>}
          >
            <Image
              src={user.image ?? '/images/avatar.png'}
              alt={user.name}
              width={35}
              height={35}
              className='rounded-full object-cover'
            />
          </Suspense>
        </Avatar>
        <Textarea
          placeholder='Add a comment...'
          className='min-h-[70px] text-xs'
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex justify-end mt-2.5 gap-2'>
        <Button onClick={() => setIsCommenting(false)} variant='outline'>
          Dismiss
        </Button>
        <Button onClick={handleAddComment}>Comment</Button>
      </div>
    </motion.div>
  );
};

export default AddComment;
