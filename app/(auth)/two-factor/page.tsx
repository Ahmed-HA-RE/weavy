import { LuKeyRound } from 'react-icons/lu';
import AuthWrapper from '../_components/auth-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { MdOutlineEmail } from 'react-icons/md';
import TwoFactorAuthenticator from './_components/two-factor-authenticator';
import TwoFactorBackupCodes from './_components/two-factor-backup-codes';
import TwoFactorEmail from './_components/two-factor-email';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const iconClasses = 'size-5';

const TwoFactorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) return redirect('/');

  const callbackURL = (await searchParams).callbackURL || '/';

  const tabs = [
    {
      name: 'Authenticator App',
      value: 'authenticator',
      icon: <HiOutlineDevicePhoneMobile className={iconClasses} />,
      content: <TwoFactorAuthenticator callbackURL={callbackURL} />,
    },
    {
      name: 'Backup Codes',
      value: 'backup-codes',
      icon: <LuKeyRound className={iconClasses} />,
      content: <TwoFactorBackupCodes callbackURL={callbackURL} />,
    },
    {
      name: 'Email OTP',
      value: 'email-otp',
      icon: <MdOutlineEmail className={iconClasses} />,
      content: <TwoFactorEmail callbackURL={callbackURL} />,
    },
  ];

  return (
    <AuthWrapper
      title='Two-Factor Verification'
      subtitle='Enter the 6-digit code from your authenticator app'
    >
      <Tabs defaultValue='authenticator' className='gap-8'>
        <TabsList className='group-data-horizontal/tabs:h-fit w-full'>
          {tabs.map(({ icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='flex-col gap-1 px-2.5 sm:px-3'
            >
              {icon}
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </AuthWrapper>
  );
};

export default TwoFactorPage;
