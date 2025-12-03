'use client';

import { useEffect, useRef, useState } from 'react';
import { useCloseRecruitTeam } from '@/hooks/team/useCloseRecruitTeam';

interface MoreMenuProps {
  teamId: number;
  status: '모집중' | '모집완료';
}

export default function MoreMenu({ teamId, status }: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: closeRecruit, isPending } = useCloseRecruitTeam();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
        <span className="text-lg">⋯</span>
      </button>

      {open && (
        <div className="absolute right-0 top-7 mt-2 min-w-[140px] bg-white border border-gray-200 rounded-md shadow-md z-50">
          {status === '모집중' ? (
            <button
              onClick={() => closeRecruit(teamId, { onSuccess: () => setOpen(false) })}
              disabled={isPending}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-60 cursor-pointer"
            >
              {isPending ? '종료 중...' : '모집 종료하기'}
            </button>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">모집이 이미 종료되었습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
