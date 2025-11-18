'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

export type TagShape = 'square' | 'rounded';
export type TagVariant =
  | 'default'
  | 'gray'
  | 'blue'
  | 'orange'
  | 'transparentDefault'
  | 'transparentBlue'
  | 'transparentOrange';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  shape?: TagShape;
  variant?: TagVariant;
  icon?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  children,
  shape = 'rounded',
  variant = 'default',
  icon,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 transition-colors duration-150';

  const shapeStyles: Record<TagShape, string> = {
    rounded: 'rounded-full font-medium',
    square: 'rounded font-semibold',
  };

  const variantStyles: Record<TagVariant, string> = {
    default: 'bg-white text-[#555555] border border-[#E7E7E7]',
    gray: 'bg-[#E6E6E6] text-[#555555]',
    blue: 'bg-[#1487F9]/15 text-[#1487F9]',
    orange: 'bg-[#F2953E]/15 text-[#F2953E]',
    transparentDefault: 'bg-white/20 text-white',
    transparentBlue: 'bg-[#1487F9]/40 text-[#1487F9]',
    transparentOrange: 'bg-[#F2953E]/40 text-[#F2953E]',
  };

  return (
    <span
      className={cn(baseStyles, shapeStyles[shape], variantStyles[variant], className)}
      {...props}
    >
      {children}
      {icon && <span className="flex items-center">{icon}</span>}
    </span>
  );
};

export default Tag;
