import { Skeleton } from '@/components/ui/skeleton';

const DetailsSettingsSkeleton = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* Desktop Save Button */}
      <div className='hidden lg:flex justify-end mb-2.5'>
        <Skeleton className='h-8 w-16 rounded-full' />
      </div>

      {/* Name + Display Name */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-10' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-28' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      {/* Email */}
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-10' />
          <Skeleton className='h-8 w-20 rounded-full' />
        </div>
        <Skeleton className='h-10 w-full' />
      </div>

      {/* Bio */}
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-4 w-8' />
        <Skeleton className='min-h-[150px] w-full' />
        <Skeleton className='h-3 w-64 self-end' />
      </div>

      {/* Website + Location */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-14' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      {/* Mobile Save Button */}
      <div className='flex lg:hidden justify-end'>
        <Skeleton className='h-8 w-16 rounded-full' />
      </div>
    </div>
  );
};

export default DetailsSettingsSkeleton;
