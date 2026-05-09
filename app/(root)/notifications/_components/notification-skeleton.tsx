import { Skeleton } from '@/components/ui/skeleton';

const NotificationSkeleton = () => {
  return (
    <div className='flex gap-4 pb-4 last-of-type:pb-0'>
      <Skeleton className='size-12 rounded-full' />
      <div className='flex flex-col gap-1 flex-1'>
        <Skeleton className='w-1/2 h-4' />
        <Skeleton className='w-1/4 h-4' />
        <Skeleton className='w-full max-w-xs mt-2 h-8' />
        <div className='flex items-center gap-2 self-end max-sm:mt-4'>
          <Skeleton className='size-6' />
          <Skeleton className='size-6' />
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
