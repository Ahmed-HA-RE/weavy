'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Suspense, TransitionStartFunction, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

type AddCommentProps = {
  postId: string;
  loggedUser: string;
  user: {
    image: string;
    name: string;
  };
  startTransition: TransitionStartFunction;
  isPending: boolean;
};

const AddComment = ({
  user,
  postId,
  loggedUser,
  startTransition,
  isPending,
}: AddCommentProps) => {
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    startTransition(async () => {});
  };

  return (
    <motion.div
      className='border-t px-4 pt-6 text-sm'
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className='flex gap-4'>
        <Avatar className='size-9'>
          <Suspense
            fallback={<AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>}
          >
            <Image
              src={user.image}
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className='flex justify-end mt-2.5'>
        <Button
          onClick={handleAddComment}
          disabled={isPending || !comment.trim()}
        >
          {isPending ? (
            <>
              <Spinner className='size-4' />
              Adding...
            </>
          ) : (
            'Comment'
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default AddComment;
