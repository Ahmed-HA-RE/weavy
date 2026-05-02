import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/lib/db';
import Image from 'next/image';
import { Suspense } from 'react';
import FollowButton from './follow-button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const SuggestedUsers = async ({ userId }: { userId: string }) => {
  const suggestedUsers = await db.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
      followers: {
        none: {
          followingId: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      displayName: true,
      image: true,
      _count: {
        select: {
          followers: true,
        },
      },
    },
    take: 5,
  });

  if (suggestedUsers.length === 0) {
    return null;
  }

  return (
    <Card className='py-6 gap-6'>
      <CardHeader>
        <CardTitle className='text-base font-semibold'>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col'>
        {suggestedUsers.map((suggestedUser, index) => (
          <React.Fragment key={suggestedUser.id}>
            <div className='flex flex-row lg:flex-col xl:flex-row xl:items-center justify-between gap-4'>
              {/* Left Side */}
              <Link
                href={`/${suggestedUser.name}`}
                className='flex gap-2 group'
              >
                <Avatar className='size-12'>
                  <Suspense
                    fallback={
                      <AvatarFallback className='uppercase'>
                        {suggestedUser.name.slice(0, 2)}
                      </AvatarFallback>
                    }
                  >
                    <Image
                      src={suggestedUser.image}
                      alt={suggestedUser.name}
                      width={48}
                      height={48}
                      className='object-cover rounded-full'
                    />
                  </Suspense>
                </Avatar>
                {/* User info */}
                <div className='flex flex-col gap-1 leading-tight text-xs max-w-[120px]'>
                  <span className='font-medium group-hover:text-accent group-hover:underline transition-colors truncate'>
                    {suggestedUser.displayName || suggestedUser.name}
                  </span>
                  <span className='text-muted-foreground truncate'>
                    @{suggestedUser.name}
                  </span>
                  <span>{suggestedUser._count.followers} followers</span>
                </div>
              </Link>
              {/* Right Side */}
              <FollowButton userId={suggestedUser.id} />
            </div>
            {suggestedUsers.length - 1 !== index && (
              <Separator className='my-4' />
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
