'use client';

import UserInfo from '@/components/user-info';
import { Prisma } from '@/lib/generated/prisma/client';
import { auth } from '@/lib/auth';
import DeleteDialog from '@/components/delete-dialog';
import { Button } from '@/components/ui/button';
import { FaTrash } from 'react-icons/fa6';
import { deleteMyCommentAction } from '@/lib/actions/user/delete-my-comment-action';

type CommentProps = {
  comment: Prisma.CommentGetPayload<{
    select: {
      id: true;
      content: true;
      createdAt: true;
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
  }>;
  loggedUser?: typeof auth.$Infer.Session.user;
  postId: string;
};

const Comment = ({ comment, loggedUser, postId }: CommentProps) => {
  const isOwner = loggedUser?.id === comment.user.id;

  return (
    <div className='flex items-start gap-3 group'>
      <div className='flex-1 flex flex-col items-start gap-6'>
        <UserInfo createdAt={comment.createdAt} user={comment.user} />
        <p className='text-sm pl-2'>{comment.content}</p>
      </div>

      {isOwner && (
        <DeleteDialog
          title='Delete my comment'
          subtitle='Are you sure you want to delete this comment?'
          trigger={
            <Button
              variant='ghost'
              size='sm'
              className='opacity-0 group-hover:opacity-100 transition-opacity'
              aria-label='Delete comment'
            >
              <FaTrash className='text-muted-foreground hover:text-destructive' />
            </Button>
          }
          action={() =>
            deleteMyCommentAction({ commentId: comment.id, postId })
          }
        />
      )}
    </div>
  );
};

export default Comment;
