import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import UsersListSkeleton from '@/components/users-list-skeleton';

const PrivacySettingsSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
      {/* Account Status */}
      <div className='space-y-8'>
        <div className='space-y-1'>
          <Skeleton className='h-6 w-36' />
          <Skeleton className='h-4 w-64' />
        </div>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-28' />
          <Skeleton className='h-9 w-36 rounded-md' />
        </div>
      </div>

      <Separator className='my-1' />

      {/* Blocked Users */}
      <div className='space-y-8'>
        <div className='space-y-1'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-80' />
        </div>
        <div className='flex flex-col gap-8'>
          {/* Search input */}
          <Skeleton className='h-10 w-full rounded-md' />
          {/* Users list */}
          <UsersListSkeleton />
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsSkeleton;
