import { Skeleton } from '@/components/ui/skeleton';

const UsersListSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className='flex items-center gap-4'>
          {/* Left /Side */}
          <Skeleton className='size-12 rounded-full' />
          {/* Right Side */}
          <div className='flex items-center justify-between flex-1'>
            <div className='flex flex-col gap-2 flex-1'>
              <Skeleton className='h-4 w-44' />
              <Skeleton className='h-4 w-42' />
            </div>
            <Skeleton className='h-8 w-20 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersListSkeleton;
