import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { formatTimeToDistance } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const PostHeader = async ({
  id,
  loggedUser,
}: {
  id: string;
  loggedUser: typeof auth.$Infer.Session.user | null;
}) => {
  const post = await db.post.findUnique({
    where: { id },
    select: {
      content: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          displayName: true,
          ...(loggedUser && {
            blocker: {
              where: {
                blockerId: loggedUser.id,
              },
            },
            blocked: {
              where: {
                blockedId: loggedUser.id,
              },
            },
          }),
        },
      },
      ...(loggedUser && {
        reports: {
          where: {
            reporterId: loggedUser.id,
          },
        },
      }),
    },
  });

  if (!post) {
    return redirect('/'); // Redirect to home if post is not found
  }

  if (
    post.user.blocker?.length > 0 ||
    post.user.blocked?.length > 0 ||
    post.reports?.length > 0
  ) {
    return redirect('/'); // Redirect to home if the user is blocked or has reported the post or has been blocked by the author
  }

  const displayName = post.user.displayName || post.user.name;

  return (
    <div className='flex flex-col gap-6'>
      {/* Author */}
      <div className='flex items-center gap-3'>
        <Link href={`/profile/${post.user.name}`}>
          <Avatar className='size-12'>
            <Suspense
              fallback={
                <AvatarFallback className='uppercase'>
                  {post.user.name.slice(0, 2)}
                </AvatarFallback>
              }
            >
              <Image
                src={post.user.image || '/images/avatar.png'}
                alt={displayName}
                width={48}
                height={48}
                className='rounded-full object-cover'
              />
            </Suspense>
          </Avatar>
        </Link>
        <div className='flex flex-col'>
          <Link
            href={`/profile/${post.user.name}`}
            className='font-semibold leading-tight hover:underline'
          >
            {displayName}
          </Link>
          <span className='text-sm text-muted-foreground'>
            @{post.user.name}
          </span>
        </div>
        <span className='ml-auto text-xs text-muted-foreground'>
          {formatTimeToDistance(post.createdAt)}
        </span>
      </div>

      {/* Content */}
      {post.content && <p className='leading-relaxed pl-2'>{post.content}</p>}

      {/* Image */}
      {post.image && (
        <div className='relative w-full overflow-hidden rounded-xl aspect-[16/9]'>
          <Image
            src={post.image}
            alt='Post image'
            fill
            loading='eager'
            className='object-cover'
          />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
