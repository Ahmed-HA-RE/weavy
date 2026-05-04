import db from '@/lib/db';
import PostCard from './post-card';
import { auth } from '@/lib/auth';

const PostList = async ({
  loggedUser,
}: {
  loggedUser?: typeof auth.$Infer.Session.user;
}) => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      content: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          displayName: true,
          image: true,
          role: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              displayName: true,
              image: true,
              role: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      likes: {
        where: {
          userId: loggedUser?.id,
        },
        select: {
          postId: true,
          userId: true,
        },
      },
    },
  });

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className='space-y-6'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} loggedUser={loggedUser} />
      ))}
    </div>
  );
};

export default PostList;
