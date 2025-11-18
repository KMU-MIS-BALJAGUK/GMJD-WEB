// src/components/common/SelectionChip.jsx

'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

export interface SelectionChipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export const SelectionChip: React.FC<SelectionChipProps> = ({
  children,
  isSelected,
  className,
  onClick,
  ...props
}) => {
  const baseStyles =
    'w-[288px] h-[48px] rounded-[8px] border text-sm font-medium flex items-center justify-center cursor-pointer transition-colors duration-200';

  // 💡 선택 상태에 따라 동적으로 스타일 변경
  const selectedStyles = isSelected
    ? 'bg-[#F1F8FF] border-[#1487F9] text-[#1487F9]' // 선택됨: 배경 #F1F8FF, 테두리/폰트 #1487F9
    : 'bg-white border-[#DDDDDD] text-[#1D1D1D]'; // 미선택: 배경 흰색, 테두리 #DDDDDD, 폰트 검정색 (hover 효과 제거됨)

  return (
    <div
      onClick={onClick}
      className={cn(baseStyles, selectedStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default SelectionChip;
