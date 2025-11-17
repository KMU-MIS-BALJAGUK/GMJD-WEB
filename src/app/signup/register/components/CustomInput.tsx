// src/app/signup/register/components/CustomInput.jsx

'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconRight?: React.ReactNode; // 오른쪽에 아이콘/버튼을 받을 prop 추가
  // 입력 필드가 전체 너비를 사용해야 하는 경우를 위한 prop입니다.
  fullWidth?: boolean;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, iconRight, fullWidth = true, ...props }, ref) => {
    // 요청하신 스타일을 기본값으로 설정
    const baseInputStyles =
      'w-full h-12 p-3 rounded-[8px] border border-transparent ' +
      'text-sm placeholder:text-[#888888] #1D1D1D text-[#1D1D1D] ' +
      'bg-[#F8F8F8] ' + // 배경색 #F8F8F8
      'focus:outline-none focus:border-[#1487F9] focus:bg-white ' + // 포커스 시 테두리색 변경
      'transition-all duration-200';

    // 💡 Wrapper 스타일: 아이콘이 있을 경우 Flex 레이아웃을 사용
    const wrapperStyles = cn(
      'relative flex items-center',
      fullWidth ? 'w-full' : 'w-[588px]', // 요청하신 너비 588px 적용 (fullWidth가 false일 경우)
      className
    );

    // 💡 아이콘이 있을 경우 입력 필드에 패딩을 추가하여 텍스트가 아이콘과 겹치지 않도록 합니다.
    const inputWithIconPadding = cn(iconRight && 'pr-20');
    return (
      <div className={wrapperStyles}>
        {/* 오른쪽 아이콘/버튼 렌더링 로직 추가 */}
        {iconRight && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">{iconRight}</div>
        )}
        <input ref={ref} className={cn(baseInputStyles, inputWithIconPadding)} {...props} />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
