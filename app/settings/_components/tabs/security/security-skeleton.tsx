import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const SecuritySkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
      {/* Password */}
      <div id='password-settings'>
        <div className='space-y-8'>
          <div className='space-y-1'>
            <Skeleton className='h-6 w-36' />
            <Skeleton className='h-4 w-48' />
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='flex justify-end'>
              <Skeleton className='h-9 w-28 rounded-full' />
            </div>
          </div>
        </div>
      </div>

      <Separator className='my-1' />

      {/* Sessions */}
      <div className='space-y-8'>
        <div className='space-y-1'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-64' />
        </div>
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-10 w-10' />
                <div className='flex flex-col gap-1.5'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-48' />
                </div>
              </div>
              <Skeleton className='h-8 w-20 rounded-full' />
            </div>
          ))}
        </div>
      </div>

      <Separator className='my-1' />

      {/* Two-Factor Authentication */}
      <div className='space-y-8'>
        <div className='space-y-1'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-4 w-56' />
        </div>
        <Skeleton className='h-17 w-full' />
      </div>
    </div>
  );
};

export default SecuritySkeleton;
