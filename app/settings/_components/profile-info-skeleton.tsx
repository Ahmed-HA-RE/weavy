import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileInfoSkeleton = () => {
  return (
    <aside className='flex flex-col items-center text-center shrink-0 lg:col-span-4'>
      <div className='space-y-6 mb-10'>
        {/* "Profile" label */}
        <p className='text-2xl lg:text-3xl text-muted-foreground'>Profile</p>
        {/* Avatar */}
        <Skeleton className='size-[150px] rounded-full mx-auto' />
      </div>

      <div className='space-y-0.5'>
        {/* Display Name */}
        <Skeleton className='h-8 w-40 mx-auto' />
        {/* Username */}
        <Skeleton className='h-5 w-28 mx-auto mt-1 mb-4' />
        {/* Bio */}
        <Skeleton className='h-4 w-56 mx-auto' />
        <Skeleton className='h-4 w-44 mx-auto' />
      </div>

      {/* Stats */}
      <div className='flex items-center gap-12 w-full justify-center my-10'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='flex flex-col items-center gap-2.5'>
            <Skeleton className='h-9 w-10' />
            <Skeleton className='h-4 w-16' />
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <Skeleton className='h-10 w-full max-w-[294px] mb-6 rounded-md' />

      {/* Location and Website */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2 justify-center'>
          <Skeleton className='size-4 shrink-0' />
          <Skeleton className='h-4 w-36' />
        </div>
        <div className='flex items-center gap-2 justify-center'>
          <Skeleton className='size-4 shrink-0' />
          <Skeleton className='h-4 w-44' />
        </div>
      </div>

      <div className='w-full max-w-[294px] mt-8'>
        <Separator className='mb-6' />
        <div className='flex items-center gap-4'>
          <Skeleton className='h-10 w-36' />
          <Skeleton className='h-10 w-36' />
        </div>
      </div>
    </aside>
  );
};

export default ProfileInfoSkeleton;
