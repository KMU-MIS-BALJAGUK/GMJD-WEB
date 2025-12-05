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
      className="border border-gray-200 rounded-lg bg-white relative hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg group h-[280px] flex flex-col"
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
      <div className="relative w-full h-[160px] bg-gray-100 flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-lg group-hover:brightness-105 transition-all duration-300"
        />
      </div>

      {/* 내용 */}
      <div className="p-4 relative flex flex-col flex-1">
        {/* 제목 */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-gray-900 pr-6">
            {title}
          </h3>

          {/* 기관명 */}
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>

        {/* 하단 정보 영역 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-text-02">
            <UsersRound size={12} />
            <span>팀원 {totalMembers}명</span>
          </div>

          {/* 역할 */}
          {role && (
            <div className="flex items-center gap-1">
              <span
                className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                  role === '팀장' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                }`}
              >
                {role}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
