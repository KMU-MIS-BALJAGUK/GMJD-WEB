'use client';

import Image from 'next/image';
import { UsersRound } from 'lucide-react';

export interface TeamCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  role?: '팀장' | '팀원';
  onClick?: (teamId: number) => void;
}

export default function TeamCard({
  id,
  title,
  subtitle,
  image,
  totalMembers,
  role,
  onClick,
}: TeamCardProps) {
  return (
    <div
      className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md bg-white relative hover:scale-105 transition duration-300 cursor-pointer"
      onClick={() => onClick?.(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(id);
        }
      }}
    >
      {/* 썸네일 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover rounded-t-lg" />
      </div>

      {/* 내용 */}
      <div className="p-4 relative">
        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight line-clamp-2 pr-6">{title}</p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 인원 & 역할 */}
        <p className="flex max-sm:flex-col max-sm:items-start items-center sm:gap-1 max-sm:text-xs text-sm mt-2">
          <UsersRound size={15} className="max-sm:hidden" /> 모집 인원 {totalMembers}명
          {role && <span className="ml-1 text-gray-600">/ {role}</span>}
        </p>
      </div>
    </div>
  );
}
