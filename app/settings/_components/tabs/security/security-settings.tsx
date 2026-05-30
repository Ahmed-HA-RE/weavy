import db from '@/lib/db';
import PasswordSettings from './password-settings';
import { Separator } from '@/components/ui/separator';
import SessionSettings from './session-settings';
import { auth } from '@/lib/auth';

const SecuritySettings = async ({ currentSession }: { currentSession: typeof auth.$Infer.Session }) => {
  const account = await db.account.findMany({
    where: {
      userId: currentSession.user.id,
    },
    select: {
      providerId: true,
    },
  });

  const isCredentialProvider = account.some((acc) => acc.providerId === 'credential');

  return (
    <div className='flex flex-col gap-6'>
      {/* Password */}
      <div className='space-y-8'>
        <h4 className='text-xl font-medium'>{isCredentialProvider ? 'Change Password' : 'Set Password'}</h4>
        <PasswordSettings isCredentialProvider={isCredentialProvider} loggedUserEmail={currentSession.user.email} />
      </div>
      <Separator className='my-1' />

      {/* Session */}
      <div className='space-y-8'>
        <div className='space-y-1'>
          <h4 className='text-xl font-medium'>Active Sessions</h4>
          <p className='text-muted-foreground text-sm'>Manage your active sessions and sign out from other devices.</p>
        </div>
        <SessionSettings currentSession={currentSession} />
      </div>
    </div>
  );
};

export default SecuritySettings;
