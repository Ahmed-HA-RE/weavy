import { Skeleton } from '@/components/ui/skeleton';

const PostHeaderSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        {/* Left Side */}
        <div className='flex items-center gap-3'>
          <Skeleton className='size-12 rounded-full' />
          <div className='flex flex-col gap-1.5'>
            <Skeleton className='h-4 w-42 rounded' />
            <Skeleton className='h-4 w-32 rounded' />
          </div>
        </div>
        {/* Right Side */}
        <Skeleton className='h-4 rounded w-26' />
      </div>

      {/* Content */}
      <Skeleton className='h-4 w-full rounded' />
      {/* Image */}
      <div className='relative w-full overflow-hidden rounded-xl aspect-[16/9]'>
        <Skeleton className='h-full w-full rounded' />
      </div>
    </div>
  );
};

export default PostHeaderSkeleton;
