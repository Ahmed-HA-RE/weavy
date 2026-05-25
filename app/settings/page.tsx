import { Metadata } from 'next';
import HeaderTabs from './_components/header-tabs';
import ProfileInfo from './_components/profile-info';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileInfoSkeleton from './_components/profile-info-skeleton';
import DetailsSettings from './_components/tabs/details/details-settings';
import DetailsSettingsSkeleton from './_components/tabs/details/details-settings-skeleton';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
};

const dynamicComponents = (tab: string, loggedUserId: string) => {
  switch (tab) {
    case 'details':
      return (
        <Suspense fallback={<DetailsSettingsSkeleton />}>
          <DetailsSettings loggedUserId={loggedUserId} />
        </Suspense>
      );
    case 'account':
      return <div>hi</div>;
    case 'security':
      return <div>hi</div>;
    case 'notifications':
      return <div>hi</div>;
    case 'appearance':
      return <div>hi</div>;
    case 'danger-zone':
      return <div>hi</div>;
  }
};

const SettingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const tab = (await searchParams).tab || 'details';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) return redirect('/login');

  const loggedUser = session.user;

  return (
    <>
      {/* Header Section */}
      <section className='bg-muted border-b pt-8 pb-2.5 md:pt-12 md:pb-4 max-md:overflow-x-auto'>
        <div className='container flex flex-col items-start gap-12'>
          <h1 className='text-3xl md:text-4xl'>Settings</h1>
          <HeaderTabs />
        </div>
      </section>
      <div className='container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 py-8 md:py-16 lg:py-24'>
        {/* Profile Info */}
        <Suspense fallback={<ProfileInfoSkeleton />}>
          <ProfileInfo loggedUserId={loggedUser.id} />
        </Suspense>

        {/* Dynamic Content Based on Active Tab */}
        <div className='lg:col-span-8 lg:border-l lg:pl-8'>
          {dynamicComponents(tab, loggedUser.id)}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
