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
    <div className='flex flex-col items-start gap-6'>
      <UserInfo createdAt={comment.createdAt} user={comment.user} />
      <p className='text-sm'>{comment.content}</p>
    </div>
  );
};

export default Comment;
