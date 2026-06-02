'use client';

import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import CheckmarkIcon from '@/components/icons/checkmark-icon';

const DoneStep = ({ backupCodes, onNext }: { backupCodes: string[]; onNext: () => void }) => {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center gap-6 py-4'>
      {/* Success icon */}
      <CheckmarkIcon />

      {/* Heading */}
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-lg font-semibold'>Two-factor authentication enabled</h3>
        <p className='text-sm text-muted-foreground max-w-sm'>
          Two-factor authentication is now active on your account. Save the backup codes below — you&apos;ll need them
          if you ever lose access to your authenticator app.
        </p>
      </div>

      {/* Backup codes */}
      <div className='w-full rounded-lg border bg-muted/40 p-4'>
        <p className='mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide'>Backup codes</p>
        {backupCodes.length === 0 ? (
          <Alert variant='warning' className='rounded-lg p-4 items-start'>
            <AlertTitle>No backup codes available</AlertTitle>
            <AlertDescription className='leading-relaxed'>
              No backup codes were generated. Please disable and re-enable two-factor authentication to generate new
              backup codes.
            </AlertDescription>
          </Alert>
        ) : (
          <div className='grid grid-cols-2 gap-2'>
            {backupCodes.map((code, index) => (
              <code
                key={index}
                className='rounded-md bg-background border px-3 py-2 text-center text-sm font-mono tracking-widest'
              >
                {code}
              </code>
            ))}
          </div>
        )}
      </div>
      <Button
        className='w-full'
        onClick={() => {
          onNext();
          router.refresh();
        }}
      >
        Close
      </Button>
    </div>
  );
};

export default DoneStep;
