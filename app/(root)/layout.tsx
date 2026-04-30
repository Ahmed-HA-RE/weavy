import Header from '@/components/header/header';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className='flex-grow container grid grid-cols-1 lg:grid-cols-12 gap-6 spacing-top'>
        {/* SideBar */}
        <div className='hidden lg:block lg:col-span-3'>sidebar</div>
        {/* Main content */}
        <div className='lg:col-span-9'>{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
