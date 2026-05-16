'use client';

import { Toaster } from '../ui/sonner';
import { ThemeProvider } from '../ui/theme-provider';
import NuqsProvider from './nuqs-provider';
import QueryProvider from './query-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <NuqsProvider>
        <ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </NuqsProvider>
    </QueryProvider>
  );
};

export default Providers;
