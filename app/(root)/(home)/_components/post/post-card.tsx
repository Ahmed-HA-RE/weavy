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
import { useOptimistic, useState, useTransition } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { FiMessageCircle } from 'react-icons/fi';
import { TbMessageReport } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';
import { togglePostLikeAction } from '@/lib/actions/post/toggle-post-like-action';
import PostComment from './post-comment';
import UserInfo from '@/components/user-info';
import AddComment from './add-comment';
import { AnimatePresence } from 'motion/react';
import { auth } from '@/lib/auth';
import PostActions from './post-actions';
import UpdatePostForm from './update-post-form';
import { PostWithRelations } from '@/types/post';

type PostCardProps = {
  post: PostWithRelations;
  loggedUser?: typeof auth.$Infer.Session.user;
};

const likeReducer = (
  state: { isLiked: boolean; count: number },
  newState: boolean,
) => {
  const isLiked = newState;
  switch (isLiked) {
    case true:
      return { isLiked, count: state.count + 1 };
    case false:
      return { isLiked, count: state.count - 1 };
    default:
      return state;
  }
};

const PostCard = ({ post, loggedUser }: PostCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    {
      isLiked: post.likes.some(
        (like) => like.userId === loggedUser?.id && post.id === like.postId,
      ),
      count: post._count.likes,
    },
    (prev, newState: boolean) => likeReducer(prev, newState),
  );
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    post.comments,
    (prev, newComment: PostCardProps['post']['comments'][number]) => [
      ...prev,
      newComment,
    ],
  );
  const [isCommenting, setIsCommenting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const isOwner = loggedUser?.id === post.user.id;
  const isFollowing = post.user.followers.length > 0;

  const handleLike = () => {
    const newLikeState = !optimisticLikes.isLiked;
    startTransition(async () => {
      setOptimisticLikes(newLikeState);
      await togglePostLikeAction(post.id);
    });
  };

  console.log(optimisticLikes);

  return (
    <Card className='gap-6 pt-6'>
      <CardHeader className='flex items-center justify-between gap-3'>
        <UserInfo createdAt={post.createdAt} user={post.user} />
        {loggedUser && (
          <CardAction>
            <PostActions
              setIsEdit={setIsEdit}
              isOwner={isOwner}
              post={{ id: post.id, userId: post.user.id }}
              isFollowing={isFollowing}
            />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className='flex flex-col gap-4 text-sm items-start'>
        {isEdit ? (
          <UpdatePostForm
            post={{ id: post.id, content: post.content, image: post.image }}
            setIsEdit={setIsEdit}
          />
        ) : (
          <>
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
                      {optimisticLikes.count > 0 && (
                        <span>{optimisticLikes.count}</span>
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
                  <Button variant='ghost' size='sm' onClick={handleLike}>
                    {optimisticLikes.isLiked ? (
                      <>
                        <FaHeart className='fill-destructive' />
                        {optimisticLikes.count > 0 && (
                          <span>{optimisticLikes.count}</span>
                        )}
                      </>
                    ) : (
                      <>
                        <FaRegHeart />
                        {optimisticLikes.count > 0 && (
                          <span>{optimisticLikes.count}</span>
                        )}
                      </>
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
                  {!isOwner && ( // Only show report button if the logged in user is not the owner of the post
                    <Button variant='ghost' size='sm' className=''>
                      <TbMessageReport />
                      Report
                    </Button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
      {/* All Comments*/}
      {optimisticComments.length > 0 && (
        <div className='border-t px-4 pt-4 space-y-6'>
          {optimisticComments.map((comment) => (
            <PostComment
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
            addOptimisticComment={addOptimisticComment}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

export default PostCard;
