import { Toaster } from '../ui/sonner';
import { ThemeProvider } from '../ui/theme-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
