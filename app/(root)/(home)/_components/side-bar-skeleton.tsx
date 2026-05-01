import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '../../../../components/ui/card';
import { Separator } from '../../../../components/ui/separator';

const SideBarSkeleton = () => {
  return (
    <div className='hidden lg:block lg:col-span-3'>
      <Card className='py-6'>
        <CardContent className='flex flex-col items-center gap-6 text-center'>
          {/* Avatar Skeleton */}
          <Skeleton className='size-20 rounded-full' />
          {/* User Info Skeleton */}
          <div className='w-full flex flex-col items-center gap-2'>
            <Skeleton className='h-7 w-32' />
            <Skeleton className='h-5 w-24' />
            <Skeleton className='h-7 w-full mt-4' />
          </div>

          <Separator />

          {/* Follow Stats Skeleton */}
          <div className='flex items-center justify-between w-full'>
            <span className='flex flex-col gap-0.5'>
              <Skeleton className='h-7 w-12 mx-auto' />
              <Skeleton className='h-5 w-16 mt-0.5' />
            </span>
            <span className='flex flex-col gap-0.5'>
              <Skeleton className='h-7 w-12 mx-auto' />
              <Skeleton className='h-5 w-16 mt-0.5' />
            </span>
          </div>

          <Separator />

          {/* Location & Website Skeleton */}
          <div className='flex flex-col gap-3 w-full'>
            <Skeleton className='h-4 w-38' />
            <Skeleton className='h-4 w-full' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SideBarSkeleton;
