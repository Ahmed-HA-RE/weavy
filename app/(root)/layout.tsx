import Header from '@/components/header/header';
import SideBar from '@/components/side-bar';
import { Suspense } from 'react';
import SideBarSkeleton from '../../components/side-bar-skeleton';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className='flex-grow container grid grid-cols-1 lg:grid-cols-12 gap-7 spacing-top'>
        {/* SideBar */}
        <div className='hidden lg:block lg:col-span-3 sticky top-4 self-start'>
          <Suspense fallback={<SideBarSkeleton />}>
            <SideBar />
          </Suspense>
        </div>
        {/* Main content */}
        <div className='lg:col-span-9'>{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
