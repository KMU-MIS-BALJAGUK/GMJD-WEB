'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function RightPopoverSelect({
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  fullWidth = true,
  className,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 바깥 클릭 닫기
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('mousedown', close);
    return () => window.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className={cn('relative', fullWidth ? 'w-full' : 'w-[588px]')}>
      {/*  
        🔥 CustomInput과 완전히 동일한 wrapper
        - h-12
        - bg-[#F8F8F8]
        - rounded-[8px]
        - px-3
        - flex items-center
        - border-transparent
      */}
      <div
        className={cn(
          'flex items-center justify-between',
          'h-12 px-3 rounded-[8px]',
          'bg-[#F8F8F8] border border-transparent',
          'transition-all duration-200 cursor-pointer',
          open && 'bg-white border-[#1487F9]'
        )}
        onClick={() => setOpen(!open)}
      >
        <span className={cn('text-sm', value ? 'text-[#1D1D1D]' : 'text-[#888888]')}>
          {value || placeholder}
        </span>

        {/* 드롭다운 화살표 */}
        <svg
          className={cn('w-4 h-4 text-[#555] transition-transform', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* 오른쪽 팝업 */}
      {open && (
        <div
          className={cn(
            'absolute top-0 left-full ml-3',
            'z-50 w-[260px] max-h-[240px] overflow-y-auto',
            'bg-white rounded-[8px] border border-[#E9E9E9]',
            'shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
          )}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                'px-4 py-2.5 text-[14px] cursor-pointer rounded-[6px]',
                value === opt.value ? 'bg-[#F5F5F5] font-medium' : 'hover:bg-[#F5F5F5]'
              )}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
