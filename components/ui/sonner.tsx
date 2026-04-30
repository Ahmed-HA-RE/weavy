'use client';

import { useTheme } from '@teispace/next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconLoader,
} from '@tabler/icons-react';
import { LuCircleX, LuCircleCheck } from 'react-icons/lu';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='bottom-right'
      icons={{
        success: <LuCircleCheck className='size-4 text-green-600' />,
        info: <IconInfoCircle className='size-4' />,
        warning: <IconAlertTriangle className='size-4' />,
        error: <LuCircleX className='size-4 text-red-600' />,
        loading: <IconLoader className='size-4 animate-spin' />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast !gap-0.5',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
