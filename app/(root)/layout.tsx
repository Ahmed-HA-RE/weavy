import Header from '@/components/header/header';
import SideBar from '@/app/(root)/(home)/_components/side-bar';
import { Suspense } from 'react';
import SideBarSkeleton from './(home)/_components/side-bar-skeleton';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className='flex-grow container grid grid-cols-1 lg:grid-cols-12 gap-6 spacing-top'>
        {/* SideBar */}
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
        {/* Main content */}
        <div className='lg:col-span-9'>{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
