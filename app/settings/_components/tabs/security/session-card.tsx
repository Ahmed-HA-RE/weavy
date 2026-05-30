'use client';
import { Card, CardContent } from '@/components/ui/card';
import { formatTimeToDistance } from '@/lib/utils';
import { FaMobile, FaDesktop } from 'react-icons/fa6';
import { HiDeviceTablet } from 'react-icons/hi2';
import RevokeSessionDialog from './revoke-session-dialog';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const deviceIcon = (deviceType: string | undefined) => {
  const classes = 'size-6.5';
  switch (deviceType) {
    case 'mobile':
      return <FaMobile className={classes} />;
    case 'tablet':
      return <HiDeviceTablet className={classes} />;
    case 'desktop':
      return <FaDesktop className={classes} />;
    default:
      return <FaDesktop className={classes} />;
  }
};

interface SessionCardProps {
  loggedInAt: Date;
  osName: string | undefined;
  deviceType: string | undefined;
  browserName: string | undefined;
  isCurrentSession?: boolean;
  sessionToken?: string;
}

const SessionCard = ({
  loggedInAt,
  osName,
  deviceType,
  browserName,
  isCurrentSession = false,
  sessionToken,
}: SessionCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRevokeSession = () => {
    startTransition(async () => {
      try {
        const { error } = await authClient.revokeSession({
          token: sessionToken as string,
        });

        if (error) throw new Error(error.message || 'Failed to revoke session');
        toast.success('Session revoked successfully');
        setOpenDialog(false);
        router.refresh();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error('Failed to revoke session:', errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  return (
    <Card className='ring-0 bg-transparent py-0'>
      <CardContent className='flex gap-4 px-0 items-start'>
        {/* Left Side */}
        <span className='p-2.5 bg-muted rounded-md flex items-center justify-center'>{deviceIcon(deviceType)}</span>
        {/* Right Side */}
        <div className='flex max-sm:flex-col flex-row justify-between flex-1 gap-4'>
          {/* Parse Session Info */}
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1 text-base font-medium'>
              <h4>{osName || 'Unknown OS'}</h4> <span className='text-muted-foreground'>·</span>
              <span>{browserName || 'Unknown Browser'}</span>
            </div>
            <div className='flex items-center text-muted-foreground text-sm font-semibold gap-2'>
              {isCurrentSession && (
                <>
                  <span className='text-emerald-500 font-bold inline-flex items-center gap-1.5'>
                    <span className='size-2 rounded-full bg-emerald-500 animate-pulse' />
                    Current Session
                  </span>
                  <span className='text-muted-foreground'>·</span>
                </>
              )}
              <span>Logged in {formatTimeToDistance(loggedInAt)}</span>
            </div>
          </div>
          {/* Revoke Session Dialog */}
          {!isCurrentSession && (
            <RevokeSessionDialog
              onRevoke={handleRevokeSession}
              isPending={isPending}
              open={openDialog}
              setOpenDialog={setOpenDialog}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
