import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SuggestedUsersSkeleton = () => {
  return (
    <Card className='py-6 gap-6'>
      <CardHeader>
        <CardTitle className='text-base font-semibold'>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col'>
        {Array.from({ length: 5 }).map((_, index) => (
          <React.Fragment key={index}>
            <div className='flex flex-row lg:flex-col xl:flex-row xl:items-center justify-between gap-4'>
              {/* Left Side */}
              <div className='flex gap-2'>
                <Skeleton className='size-12 rounded-full' />
                {/* User info */}
                <div className='flex flex-col gap-1 leading-tight max-w-[120px]'>
                  <Skeleton className='h-3 w-24' />
                  <Skeleton className='h-3 w-24' />
                  <Skeleton className='h-3 w-20' />
                </div>
              </div>
              {/* Right Side */}
              <Skeleton className='h-9 w-20' />
            </div>
            {index !== 4 && <Separator className='my-4' />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedUsersSkeleton;
