'use client';

// 💡 1. 'ReactNode' 타입을 React에서 가져옵니다.
import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// 💡 2. 옵션 타입을 명확히 정의합니다.
type Option = {
  value: string;
  label: string;
};

// 💡 3. 컴포넌트가 받을 Props의 타입을 Interface로 정의합니다.
interface RightPopoverSelectProps {
  options: Option[]; // 'any' 대신 'Option[]'
  value?: string; // 'any' 대신 'string'
  onChange: (value: string) => void; // 'any' 대신 명확한 함수 타입
  placeholder?: string;
  fullWidth?: boolean;
  className?: string; // 'any' 대신 'string'
}

// 💡 4. 컴포넌트 인자에 Props 타입을 적용합니다.
export default function RightPopoverSelect({
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  fullWidth = true,
  className,
}: RightPopoverSelectProps) {
  const [open, setOpen] = useState(false);
  // 💡 5. useRef의 타입을 명시합니다. (DOM 노드를 참조)
  const ref = useRef<HTMLDivElement>(null);

  // 💡 6. 'useEffect'의 훅 타입을 수정합니다.
  useEffect(() => {
    // 💡 7. 'e'의 타입을 'any' 대신 'MouseEvent'로 명시합니다.
    const close = (e: MouseEvent) => {
      // 💡 8. 'e.target'이 DOM Node임을 타입스크립트에게 알려줍니다. (as Node)
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', close);
    return () => window.removeEventListener('mousedown', close);
  }, []);

  return (
    // 💡 9. 'ref'를 div에 연결합니다.
    <div ref={ref} className={cn('relative', fullWidth ? 'w-full' : 'w-[588px]')}>
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
          {value ? options.find((o) => o.value === value)?.label : placeholder}
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
          {/* 💡 10. 'opt'는 'options' 타입(Option[])을 따라 'Option'으로 자동 추론됩니다. */}
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
