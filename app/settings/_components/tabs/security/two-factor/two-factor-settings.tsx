import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RiShieldKeyholeLine, RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineSecurity } from 'react-icons/md';
import TwoFactorDialog from './two-factor-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FaCheck } from 'react-icons/fa6';
import DisableTwoFactorDialog from './disable-two-factorDialog';

interface TwoFactorSettingsProps {
  isCredentialProvider: boolean;
  isTwoFactorEnabled: boolean;
}

const NoPasswordWarning = () => (
  <div className='flex flex-col gap-5'>
    {/* Disabled 2FA toggle preview */}
    <div className='relative flex items-start gap-4 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-4 opacity-60 select-none'>
      <span className='mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-muted'>
        <RiShieldKeyholeLine className='size-5 text-muted-foreground' />
      </span>
      <div className='flex flex-1 flex-col gap-1'>
        <p className='text-sm font-medium text-foreground'>Authenticator App</p>
        <p className='text-xs text-muted-foreground'>
          Use an authenticator app like Google Authenticator or Authy to
          generate one-time codes.
        </p>
      </div>
      <Button
        size='sm'
        variant='outline'
        disabled
        className='self-center shrink-0 cursor-not-allowed'
        aria-disabled='true'
      >
        Enable
      </Button>
      {/* Lock overlay badge */}
      <span className='absolute -top-2.5 -right-2.5 flex items-center gap-1 rounded-full border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'>
        <RiLockPasswordLine className='size-3' />
        Password required
      </span>
    </div>

    {/* Callout */}
    <Alert variant='warning' className='rounded-lg p-4 items-start'>
      <MdOutlineSecurity className='size-5 mt-0.5' />
      <AlertTitle>Password required to enable 2FA</AlertTitle>
      <AlertDescription className='leading-relaxed'>
        Two-factor authentication adds a second layer of protection to your
        account. However, it requires a{' '}
        <strong className='font-semibold text-slate-700 inline-block'>
          password-based login
        </strong>{' '}
        to work. Your account currently uses a social login (e.g. Google,
        GitHub) with no password set.
      </AlertDescription>
    </Alert>
  </div>
);

const ToggleTwoFactor = ({
  isTwoFactorEnabled,
}: {
  isTwoFactorEnabled: boolean;
}) => (
  <Card
    className={cn(isTwoFactorEnabled && 'ring-0 bg-green-50 dark:bg-green-100')}
  >
    <CardContent className='flex gap-4'>
      <span
        className={cn(
          'mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full',
          isTwoFactorEnabled
            ? 'bg-green-100 dark:bg-green-200'
            : 'bg-primary/10',
        )}
      >
        {isTwoFactorEnabled ? (
          <FaCheck className='size-5 text-green-500 dark:text-green-700' />
        ) : (
          <RiShieldKeyholeLine className='size-5 text-primary' />
        )}
      </span>
      <div className='flex-1 flex items-center justify-between gap-0.5'>
        <div className='flex flex-col gap-1'>
          <p
            className={cn(
              'text-sm font-medium',
              isTwoFactorEnabled
                ? 'text-green-700 dark:text-green-800'
                : 'text-foreground',
            )}
          >
            {isTwoFactorEnabled ? '2FA Enabled' : 'Set Up 2FA'}
          </p>
          {!isTwoFactorEnabled && (
            <p className='text-xs text-muted-foreground'>
              Use an authenticator app to generate one-time codes.
            </p>
          )}
        </div>
        {isTwoFactorEnabled ? <DisableTwoFactorDialog /> : <TwoFactorDialog />}
      </div>
    </CardContent>
  </Card>
);

const TwoFactorSettings = ({
  isCredentialProvider,
  isTwoFactorEnabled,
}: TwoFactorSettingsProps) => {
  if (!isCredentialProvider) {
    return <NoPasswordWarning />;
  }

  return <ToggleTwoFactor isTwoFactorEnabled={isTwoFactorEnabled} />;
};

export default TwoFactorSettings;
