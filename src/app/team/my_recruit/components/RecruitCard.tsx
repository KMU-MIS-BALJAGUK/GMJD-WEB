// src/app/team/my_recruit/components/RecruitCard.tsx

'use client';

import Image from 'next/image';
import MoreMenu from '@/app/team/components/MoreMenu';
import { UsersRound } from 'lucide-react';

export interface RecruitManageCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  applicants: number;
  recruitedCount: number;
  status: '모집중' | '모집완료';
  onClick?: () => void;
}

export default function RecruitManageCard({
  id,
  title,
  subtitle,
  image,
  totalMembers,
  applicants,
  recruitedCount,
  status,
  onClick,
}: RecruitManageCardProps) {
  const isOpen = status === '모집중';

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md bg-white relative hover:scale-105 transition duration-300 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
      {/* 썸네일 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover rounded-t-lg" />

        {/* 모집 상태 */}
        <div className="absolute bottom-2 left-2">
          {isOpen ? (
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold shadow">
              모집중
            </span>
          ) : (
            <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-semibold shadow">
              모집완료
            </span>
          )}
        </div>
      </div>

      {/* 내용 */}
      <div className="p-4 relative">
        {/* 더보기 메뉴 */}
        <div
          className="absolute top-3 right-3"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <MoreMenu teamId={id} status={status} />
        </div>

        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight line-clamp-2 pr-6">{title}</p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 현황 */}
        <p className="flex items-center gap-1 text-sm mt-2">
          <UsersRound size={15} /> 모집 인원 {totalMembers}명 /
          <span className="text-blue-500 font-semibold ml-1">지원 {applicants}명</span>
          <span className="text-blue-500 font-semibold ml-1">/ 영입 {recruitedCount}명</span>
        </p>
      </div>
    </div>
  );
}
