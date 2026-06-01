import db from '@/lib/db';
import PasswordSettings from './password-settings';
import { Separator } from '@/components/ui/separator';
import SessionSettings from './session-settings';
import { auth } from '@/lib/auth';
import SecuritySettingsWrapper from './security-settings-wrapper';
import TwoFactorSettings from './two-factor/two-factor-settings';

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
  const isTwoFactorEnabled = currentSession.user.twoFactorEnabled;

  return (
    <div className='flex flex-col gap-6'>
      {/* Password */}
      <div id='password-settings'>
        <SecuritySettingsWrapper
          title={isCredentialProvider ? 'Change Password' : 'Set Password'}
          description={isCredentialProvider ? 'Change your account password.' : 'Set a password for your account.'}
        >
          <PasswordSettings isCredentialProvider={isCredentialProvider} loggedUserEmail={currentSession.user.email} />
        </SecuritySettingsWrapper>
      </div>
      <Separator className='my-1' />

      {/* Session */}
      <SecuritySettingsWrapper
        title='Active Sessions'
        description='Manage your active sessions and sign out from other devices.'
      >
        <SessionSettings currentSession={currentSession} />
      </SecuritySettingsWrapper>

      <Separator className='my-1' />

      {/* Two-Factor Authentication */}
      <SecuritySettingsWrapper
        title='Two-Factor Authentication'
        description='Add an extra layer of security to your account.'
      >
        <TwoFactorSettings isCredentialProvider={isCredentialProvider} isTwoFactorEnabled={isTwoFactorEnabled} />
      </SecuritySettingsWrapper>
    </div>
  );
};

export default SecuritySettings;
