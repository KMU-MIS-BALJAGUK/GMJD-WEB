'use client';

import * as React from 'react';
import { Input as BaseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const baseClasses =
  'w-full rounded-[8px] text-[15px] px-4 py-2' +
  'placeholder:text-text-03 disabled:cursor-not-allowed disabled:opacity-50 ' +
  'ring-offset-0 outline-none shadow-none focus-visible:outline-none ' +
  'transition-colors duration-200 ease-in-out ';

const inputVariants = cva(baseClasses, {
  variants: {
    variant: {
      default: 'bg-bg-02 h-11 border-none focus-visible:ring-1 focus-visible:ring-blue',
      rounded:
        'bg-bg-02 h-11 rounded-[42px] px-6 border-none focus-visible:ring-1 focus-visible:ring-blue',
      heroInput:
        'bg-white h-11 rounded-[42px] px-6 drop-shadow-sm border-none focus-visible:ring-1 focus-visible:ring-blue',
      textArea:
        'bg-bg-02 p-4 h-11 align-top resize-none h-[124px] border-none focus-visible:ring-1 focus-visible:ring-blue',
      chat: 'bg-bg-02 h-11 rounded-[30px] px-6 border-none focus-visible:ring-1 focus-visible:ring-blue',
      error: 'bg-bg-02 h-11 border border-red-500 text-red-600 focus-visible:ring-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type VariantType = 'default' | 'rounded' | 'heroInput' | 'textArea' | 'chat' | 'error';

type BaseProps = {
  variant?: VariantType;
  icon?: React.ReactNode;
  error?: string;
};

type InputProps =
  | (BaseProps & React.InputHTMLAttributes<HTMLInputElement>)
  | (BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

export default function Input(props: InputProps) {
  const { variant, error, className, icon, ...rest } = props;

  const isTextArea = variant === 'textArea';
  const v = error ? 'error' : variant;

  return (
    <div className="flex flex-col space-y-1">
      <div className="relative">
        {isTextArea ? (
          <textarea
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={cn(inputVariants({ variant: v }), className)}
          />
        ) : (
          <BaseInput
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            className={cn(inputVariants({ variant: v }), icon && 'pr-14', className)}
          />
        )}

        {icon && !isTextArea && (
          <div
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer',
              (variant === 'rounded' || variant === 'heroInput') && 'right-6'
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
