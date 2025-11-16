'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'disabled'
  | 'active'
  | 'gray'
  | 'red';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'rounded-[8px] px-4 h-11 text-[14px] font-medium flex items-center justify-center cursor-pointer transition-colors duration-200';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue text-white hover:bg-[#0f6cd1]',
    secondary: 'bg-white text-blue border border-blue hover:bg-blue-50',
    ghost: 'bg-white border border-[#DDDDDD] text-[#1D1D1D] hover:bg-gray-100',
    disabled: 'bg-gray-200 text-gray-700 cursor-not-allowed',
    active: 'bg-[#F1F8FF] text-blue border border-blue',
    gray: 'bg-btn-gray text-text-02 hover:bg-gray-300',
    red: 'bg-red-100 text-[#F35064] hover:bg-red-200',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], fullWidth && 'w-full', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
