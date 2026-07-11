import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 shadow-sm transition-colors',
          'placeholder:text-neutral-500',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          '[&[type=date]]:cursor-pointer [&[type=date]::-webkit-calendar-picker-indicator]:filter [&[type=date]::-webkit-calendar-picker-indicator]:invert [&[type=date]::-webkit-calendar-picker-indicator]:opacity-60',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
