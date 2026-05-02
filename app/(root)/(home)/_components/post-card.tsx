'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Prisma } from '@/lib/generated/prisma/client';
import { cn } from '@/lib/utils';
import { Suspense, useState, useTransition } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaEllipsisVertical, FaHeart } from 'react-icons/fa6';
import { FiMessageCircle } from 'react-icons/fi';
import { HiBadgeCheck } from 'react-icons/hi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { TbMessageReport } from 'react-icons/tb';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { togglePostLikeAction } from '@/lib/actions/post/toggle-post-like-action';

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
  loggedUser?: string;
};

const PostCard = ({ post, loggedUser }: PostCardProps) => {
  const [optimisticLike, setOptimisticLike] = useState(
    post.likes.some(
      (like) => like.userId === loggedUser && like.postId === post.id,
    ),
  );
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(
    post._count.likes,
  );
  const [isPending, startTransition] = useTransition();

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
        <div className='flex items-center gap-3'>
          <Link href={`/${post.user.name}`}>
            <Avatar size='lg'>
              <Suspense
                fallback={
                  <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                }
              >
                <Image
                  src={post.user.image}
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className='rounded-full object-cover'
                />
              </Suspense>
            </Avatar>
          </Link>
          <div className='flex flex-col leading-tight'>
            <CardTitle className='flex items-center gap-1 text-sm'>
              {post.user.displayName || post.user.name}{' '}
              {post.user.role === 'ADMIN' ? (
                <MdAdminPanelSettings className='size-4 text-amber-600' />
              ) : (
                <HiBadgeCheck className='size-4 text-accent ' />
              )}
            </CardTitle>
            <CardDescription>
              @{post.user.name} ·{' '}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </CardDescription>
          </div>
        </div>
        {/* Later will dropdown menu for actions like delete post and toggle follow  */}
        {loggedUser && (
          <CardAction>
            <Button variant='ghost' size='sm' aria-label='Post options'>
              <FaEllipsisVertical />
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className='space-y-6 text-sm'>
        <p>{post.content}</p>

        {post.image && (
          <Image
            src={post.image}
            alt={`Post image by ${post.user.name}`}
            className='aspect-video w-full rounded-md object-cover'
          />
        )}
      </CardContent>
      <CardFooter className='flex items-center gap-1 px-2'>
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
              {optimisticLikesCount > 0 && <span>{optimisticLikesCount}</span>}
            </Button>
            <Button variant='ghost' size='sm'>
              <FiMessageCircle />
              {post._count.comments > 0 && <span>{post._count.comments}</span>}
            </Button>
            <Button variant='ghost' size='sm' className=''>
              <TbMessageReport />
              Report
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
