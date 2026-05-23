import { Metadata } from 'next';
import HeaderTabs from './_components/header-tabs';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
};

const SettingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const tab = (await searchParams).tab || 'details';

  return (
    <>
      {/* Header Section */}
      <section className='bg-muted border-b pt-8 pb-2.5 md:pt-12 md:pb-4 max-md:overflow-x-auto'>
        <div className='container flex flex-col items-start gap-12'>
          <h1 className='text-3xl md:text-4xl'>Settings</h1>
          <HeaderTabs />
        </div>
      </section>
    </>
  );
};

export default SettingsPage;
