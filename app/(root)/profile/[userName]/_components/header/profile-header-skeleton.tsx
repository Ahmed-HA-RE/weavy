import { Skeleton } from '@/components/ui/skeleton';

const ProfileHeaderSkeleton = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start'>
      {/* Left Column — Avatar */}
      <Skeleton className='size-[150px] rounded-full' />

      {/* Right Column */}
      <div className='space-y-5'>
        {/* Top Content */}
        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
          {/* Display name */}
          <Skeleton className='h-7 w-40 rounded-md' />
          {/* Action buttons */}
          <div className='space-x-2.5 flex items-center'>
            <Skeleton className='h-9 w-20 rounded-md' />
            <Skeleton className='size-9 rounded-md' />
          </div>
        </div>

        {/* Metrics row */}
        <div className='flex items-center justify-center lg:justify-start gap-x-10'>
          {['posts', 'followers', 'following'].map((label) => (
            <Skeleton key={label} className='h-4 w-16 rounded-md' />
          ))}
        </div>

        {/* Bio section */}
        <div className='text-center lg:text-left space-y-1'>
          <Skeleton className='h-4 w-28 rounded-md' />
          <Skeleton className='h-4 w-48 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
