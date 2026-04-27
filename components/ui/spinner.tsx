import { cn } from '@/lib/utils';
import { IconRotateClockwise2 } from '@tabler/icons-react';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <IconRotateClockwise2
      role='status'
      aria-label='Loading'
      className={cn('size-5 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
