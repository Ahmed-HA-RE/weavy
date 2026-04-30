import Header from '@/components/header/header';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className='flex-grow'>{children}</main>

      {/* Footer */}
    </div>
  );
};

export default RootLayout;
