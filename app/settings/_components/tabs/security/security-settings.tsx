import db from '@/lib/db';
import PasswordSettings from './password-settings';

const SecuritySettings = async ({ loggedUserId }: { loggedUserId: string }) => {
  const account = await db.account.findMany({
    where: {
      userId: loggedUserId,
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
        <PasswordSettings isCredentialProvider={isCredentialProvider} loggedUserId={loggedUserId} />
      </div>
    </div>
  );
};

export default SecuritySettings;
