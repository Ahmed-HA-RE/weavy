'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Prisma } from '@/lib/generated/prisma/client';
import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaEllipsis, FaHeart } from 'react-icons/fa6';
import { FiMessageCircle } from 'react-icons/fi';
import { TbMessageReport } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';
import { togglePostLikeAction } from '@/lib/actions/post/toggle-post-like-action';
import Comment from './comment';
import UserInfo from '@/components/user-info';
import AddComment from './add-comment';
import { AnimatePresence } from 'motion/react';
import { auth } from '@/lib/auth';

type PostCardProps = {
  post: Prisma.PostGetPayload<{
    select: {
      id: true;
      content: true;
      image: true;
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
      comments: {
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
      };
      _count: {
        select: {
          likes: true;
          comments: true;
        };
      };
      likes: {
        where: {
          userId: string | undefined;
        };
        select: {
          postId: true;
          userId: true;
        };
      };
    };
  }>;
  loggedUser?: typeof auth.$Infer.Session.user;
};

const PostCard = ({ post, loggedUser }: PostCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticLike, setOptimisticLike] = useState(
    post.likes.some(
      (like) => like.userId === loggedUser?.id && like.postId === post.id,
    ),
  );
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(
    post._count.likes,
  );
  const [isCommenting, setIsCommenting] = useState(false);

  const handleLike = () => {
    setOptimisticLikesCount((prev) => (optimisticLike ? prev - 1 : prev + 1)); // Optimistically update likes count so UI is updated fast while the backend request is being processed
    setOptimisticLike((prev) => !prev); // Optimistically toggle like state so UI is toggled fast while the backend request is being processed
    startTransition(async () => {
      const result = await togglePostLikeAction(post.id);

      if (!result.success) {
        // If the action failed, revert the optimistic update
        setOptimisticLikesCount((prev) =>
          optimisticLike ? prev - 1 : prev + 1,
        );
        setOptimisticLike((prev) => !prev);
      }
    });
  };

  return (
    <Card className='gap-6 pt-6'>
      <CardHeader className='flex items-center justify-between gap-3'>
        <UserInfo createdAt={post.createdAt} user={post.user} />
        {/* Later will dropdown menu for actions like delete post and toggle follow  */}
        {loggedUser && (
          <CardAction>
            <Button variant='ghost' size='sm' aria-label='Post options'>
              <FaEllipsis />
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className='flex flex-col gap-4 text-sm items-start'>
        <p>{post.content}</p>

        {post.image && (
          <div className='relative aspect-video w-full rounded-md'>
            <Image
              src={post.image}
              alt={`Post image by ${post.user.name}`}
              fill
              className='rounded-md object-cover'
            />
          </div>
        )}
        <div className='flex items-center gap-1'>
          {!loggedUser ? (
            <>
              <Button asChild variant='ghost' size='sm'>
                <Link href='/sign-in'>
                  <FaRegHeart />
                  {optimisticLikesCount > 0 && (
                    <span>{optimisticLikesCount}</span>
                  )}
                </Link>
              </Button>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/sign-in'>
                  <FiMessageCircle />
                  {post._count.comments > 0 && (
                    <span>{post._count.comments}</span>
                  )}
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='ghost'
                size='sm'
                onClick={handleLike}
                disabled={isPending}
              >
                {optimisticLike ? (
                  <FaHeart
                    className={cn(
                      'text-red-500',
                      optimisticLike && 'fill-red-500',
                    )}
                  />
                ) : (
                  <FaRegHeart />
                )}
                {optimisticLikesCount > 0 && (
                  <span>{optimisticLikesCount}</span>
                )}
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsCommenting((prev) => !prev)}
              >
                <FiMessageCircle />
                {post._count.comments > 0 && (
                  <span>{post._count.comments}</span>
                )}
              </Button>
              <Button variant='ghost' size='sm' className=''>
                <TbMessageReport />
                Report
              </Button>
            </>
          )}
        </div>
      </CardContent>
      {/* All Comments*/}
      {post.comments.length > 0 && (
        <div className='border-t px-4 pt-4 space-y-6'>
          {post.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              loggedUser={loggedUser}
              postId={post.id}
            />
          ))}
        </div>
      )}

      {/* Add Comment */}
      <AnimatePresence>
        {isCommenting && loggedUser && (
          <AddComment
            postId={post.id}
            user={loggedUser}
            isPending={isPending}
            startTransition={startTransition}
            setIsCommenting={setIsCommenting}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

export default PostCard;
