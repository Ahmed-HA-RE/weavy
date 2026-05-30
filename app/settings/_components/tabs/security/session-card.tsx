'use client';

import { Card, CardContent } from '@/components/ui/card';
import { formatTimeToDistance } from '@/lib/utils';
import { FaMobile, FaDesktop } from 'react-icons/fa6';
import { HiDeviceTablet } from 'react-icons/hi2';

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
}

const SessionCard = ({ loggedInAt, osName, deviceType, browserName, isCurrentSession = false }: SessionCardProps) => {
  return (
    <Card className='ring-0 bg-transparent py-0'>
      <CardContent className='flex gap-4 px-0'>
        {/* Left Side */}
        <span className='p-2.5 bg-muted rounded-md flex items-center justify-center'>{deviceIcon(deviceType)}</span>
        {/* Right Side */}
        <div className='flex justify-between'>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
