import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PostSkeletonCard = () => {
  return (
    <Card className='gap-6 pt-6'>
      <CardHeader className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3 w-full'>
          <Skeleton className='size-10 rounded-full shrink-0' />
          <div className='flex flex-col gap-2 flex-1'>
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-3 w-20' />
          </div>
        </div>

        <CardAction>
          <Skeleton className='h-8 w-8 rounded-md' />
        </CardAction>
      </CardHeader>

      <CardContent className='flex flex-col gap-4 text-sm items-start'>
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-[92%]' />
          <Skeleton className='h-4 w-[80%]' />
          <Skeleton className='h-4 w-[65%]' />
        </div>

        <Skeleton className='h-[260px] w-full rounded-md' />

        <div className='flex items-center gap-3'>
          <Skeleton className='h-8 w-14 rounded-md' />
          <Skeleton className='h-8 w-14 rounded-md' />
          <Skeleton className='h-8 w-20 rounded-md' />
        </div>
      </CardContent>

      <div className='border-t px-4 pt-4 space-y-6'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
              <Skeleton className='size-8 rounded-full shrink-0' />
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-3.5 w-24' />
                <Skeleton className='h-3 w-16' />
              </div>
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-3.5 w-[85%]' />
              <Skeleton className='h-3.5 w-[60%]' />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PostSkeletonCard;
