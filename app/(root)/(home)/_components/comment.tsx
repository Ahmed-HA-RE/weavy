import UserInfo from '@/components/user-info';
import { Prisma } from '@/lib/generated/prisma/client';

type CommentProps = {
  comment: Prisma.CommentGetPayload<{
    select: {
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
};

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className='flex items-start gap-4 border-t px-4 py-4'>
      <UserInfo createdAt={comment.createdAt} user={comment.user} />
      <p className='text-sm'>{comment.content}</p>
    </div>
  );
};

export default Comment;
