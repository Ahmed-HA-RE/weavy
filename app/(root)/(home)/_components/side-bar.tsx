import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Avatar, AvatarFallback } from '../../../../components/ui/avatar';
import { Suspense } from 'react';
import Image from 'next/image';
import { Separator } from '../../../../components/ui/separator';
import db from '@/lib/db';
import { TbLocation } from 'react-icons/tb';
import { FiLink } from 'react-icons/fi';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const SideBar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let user = null;

  if (session?.user) {
    user = await db.user.findUnique({
      where: { id: session?.user.id },
      select: {
        name: true,
        displayName: true,
        image: true,
        bio: true,
        location: true,
        website: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });
  }

  return (
    <Card className={cn(user && 'py-6')}>
      {!user && (
        <CardHeader className='text-center gap-4'>
          <CardTitle className='lg:text-base xl:!text-lg'>
            Welcome Back!
          </CardTitle>
          <CardDescription className='xl:text-sm leading-relaxed'>
            Login to access your account and start connecting with others.
          </CardDescription>
        </CardHeader>
      )}
      {user && (
        <CardContent className='flex flex-col items-center gap-6 text-center '>
          {/* Avatar */}
          <Avatar className='size-20 mx-auto'>
            <Suspense
              fallback={
                <AvatarFallback className='uppercase'>
                  {user.name.slice(0, 2)}
                </AvatarFallback>
              }
            >
              <Image
                src={user.image || '/images/avatar.png'}
                alt={user.name}
                width={80}
                height={80}
                loading='eager'
                className='rounded-full object-cover'
              />
            </Suspense>
          </Avatar>
          {/* User Info */}
          <div>
            <h2 className='text-lg font-bold'>
              {user.displayName || user.name}
            </h2>
            <h3 className='text-sm text-muted-foreground'>@{user.name}</h3>
            {/* Bio */}
            {user.bio && (
              <p className='text-xs text-muted-foreground mt-4'>{user.bio}</p>
            )}
          </div>
          <Separator />
          {/* Follow */}
          <div className='flex items-center justify-between w-full'>
            <span className='flex flex-col gap-0.5'>
              <h2 className='text-lg'>{user._count.following}</h2>
              <p className='text-sm text-muted-foreground'>Following</p>
            </span>
            <span className='flex flex-col gap-0.5'>
              <h2 className='text-lg'>{user._count.followers}</h2>
              <p className='text-sm text-muted-foreground'>Followers</p>
            </span>
          </div>
          {(user.location || user.website) && (
            <>
              <Separator />
              <div className='flex flex-col gap-3 w-full'>
                {user.location && (
                  <span className='flex items-center gap-2.5 text-muted-foreground text-xs max-w-[200px] truncate'>
                    <TbLocation className='size-3.5 shrink-0' />
                    {user.location}
                  </span>
                )}
                {user.website && (
                  <a
                    href={user.website as string}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2.5 text-muted-foreground text-xs hover:underline cursor-pointer max-w-[250px]'
                  >
                    <FiLink className='size-3.5 shrink-0' />
                    <span className='truncate'>{user.website}</span>
                  </a>
                )}
              </div>
            </>
          )}
        </CardContent>
      )}
      {!user && (
        <CardFooter className='flex flex-col gap-2.5'>
          <Button asChild variant='outline' className='w-full'>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
          <Button asChild variant='secondary' className='w-full'>
            <Link href='/sign-up'>Sign Up</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SideBar;
