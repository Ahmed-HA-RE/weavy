import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'h-7 w-full min-w-0 rounded-md border focus-visible:border-2 border-input px-2 py-0.5 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-accent  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      inputSize: {
        default: 'h-10 text-sm',
        sm: 'h-8 text-xs',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      inputSize: 'default',
    },
  },
);
function Input({
  className,
  type,
  inputSize = 'default',
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(inputVariants({ inputSize }), className)}
      {...props}
    />
  );
}

export { Input };
