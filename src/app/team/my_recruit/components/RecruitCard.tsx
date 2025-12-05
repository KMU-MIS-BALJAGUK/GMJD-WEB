// src/app/team/my_recruit/components/RecruitCard.tsx

'use client';

import Image from 'next/image';
import MoreMenu from '@/app/team/components/MoreMenu';
import Tag from '@/components/common/Tag';
import { UsersRound } from 'lucide-react';

export interface RecruitManageCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  applicants: number;
  recruitedCount: number;
  status: '모집중' | '모집완료' | '모집만료';
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
      className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md bg-white relative hover:scale-105 transition duration-300 cursor-pointer h-[280px] flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover rounded-t-lg" />

        <div className="absolute bottom-2 left-2">
          {isOpen ? (
            <Tag variant="green" shape="square" className="text-xs">
              모집중
            </Tag>
          ) : status === '모집완료' ? (
            <Tag variant="gray" shape="square" className="text-xs">
              모집 마감
            </Tag>
          ) : (
            <Tag variant="gray" shape="square" className="text-xs">
              모집 만료
            </Tag>
          )}
        </div>
      </div>

      <div className="p-4 relative flex flex-col flex-1">
        <div
          className="absolute top-3 right-3"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <MoreMenu teamId={id} status={status} />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-sm leading-tight line-clamp-2 pr-6">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-text-02">
            <UsersRound size={12} />
            <span>모집 인원 {totalMembers}명</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
              지원 {applicants}명
            </div>
            <div className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-xs font-medium">
              현재 팀원 {recruitedCount}명
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
