'use client';

import { Toaster } from '../ui/sonner';
import { ThemeProvider } from '../ui/theme-provider';
import QueryProvider from './query-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
