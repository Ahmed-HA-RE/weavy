'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { useOptimistic, useState, useTransition } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart, FaRegBookmark } from 'react-icons/fa6';
import { FiMessageCircle } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { togglePostLikeAction } from '@/lib/actions/post/toggle-post-like-action';
import PostComment from './post-comment';
import UserInfo from '@/components/user-info';
import AddComment from './add-comment';
import { AnimatePresence } from 'motion/react';
import { auth } from '@/lib/auth';
import { PostWithRelations } from '@/types/post';
import PostForm from './post-form';
import ReportPostDialog from './report-post-dialog';
import { useQueryClient } from '@tanstack/react-query';
import BookmarkPostButton from './bookmark-post-button';
import { cn } from '@/lib/utils';
import PostOptions from './post-options';

type PostCardPost = Omit<PostWithRelations, 'comments'> & {
  comments?: PostWithRelations['comments'];
};

type PostCardProps = {
  post: PostCardPost;
  loggedUser: typeof auth.$Infer.Session.user | null;
  profilePage?: boolean;
  className?: string;
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

const PostCard = ({
  post,
  loggedUser,
  profilePage = false,
  className,
}: PostCardProps) => {
  const queryClient = useQueryClient();
  const comments = post.comments ?? [];
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
    {
      comments,
      commentsCount: post._count.comments,
    },
    (state, newState: PostWithRelations['comments'][number]) => {
      return {
        commentsCount: state.commentsCount + 1,
        comments: [...state.comments, newState],
      };
    },
  );
  const [isCommenting, setIsCommenting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const isOwner = loggedUser?.id === post.user.id;
  const isFollowing = post.user.followers.length > 0;
  const isUserBookmarked = post.bookmarks.some(
    (bookmark) =>
      bookmark.userId === loggedUser?.id && bookmark.postId === post.id,
  );

  const handleLike = () => {
    const newLikeState = !optimisticLikes.isLiked;
    startTransition(async () => {
      setOptimisticLikes(newLikeState);
      await togglePostLikeAction(post.id);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['posts'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['user-posts', post.user.name],
        }),
        queryClient.invalidateQueries({
          queryKey: ['user-likes', post.user.name],
        }),
      ]);
    });
  };
  return (
    <Card className={cn('gap-6 pt-6', className)}>
      <CardHeader className='flex items-center justify-between gap-3'>
        <UserInfo createdAt={post.createdAt} user={post.user} />
        {loggedUser && (
          <CardAction>
            <PostOptions
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
          <PostForm
            post={{
              id: post.id,
              content: post.content,
              image: post.image,
              imageKey: post.imageKey,
            }}
            isEdit={isEdit}
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
                  loading='eager'
                  sizes='auto'
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
                  <Button asChild variant='ghost' size='sm'>
                    <Link href='/sign-in'>
                      <FaRegBookmark />
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

                  {profilePage ? (
                    <Button variant='ghost' size='sm' asChild>
                      <Link href={`/post/${post.id}`}>
                        <FiMessageCircle />
                        {optimisticComments.commentsCount > 0 && (
                          <span>{optimisticComments.commentsCount}</span>
                        )}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setIsCommenting((prev) => !prev)}
                    >
                      <FiMessageCircle />
                      {optimisticComments.commentsCount > 0 && (
                        <span>{optimisticComments.commentsCount}</span>
                      )}
                    </Button>
                  )}

                  {!isOwner && loggedUser && (
                    <BookmarkPostButton
                      postId={post.id}
                      isUserBookmarked={isUserBookmarked}
                    />
                  )}
                  {!isOwner && ( // Only show report button if the logged in user is not the owner of the post
                    <ReportPostDialog
                      reporterId={loggedUser.id}
                      postId={post.id}
                    />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
      {/* All Comments*/}
      {optimisticComments.commentsCount > 0 && !profilePage && (
        <div className='border-t px-4 pt-4 space-y-6'>
          {optimisticComments.comments.map((comment) => (
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
        {isCommenting && loggedUser && !profilePage && (
          <AddComment
            postId={post.id}
            user={loggedUser}
            setIsCommenting={setIsCommenting}
            addOptimisticComment={addOptimisticComment}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

export default PostCard;
