"use client";

import Image from "next/image";
import MoreMenu from "./MoreMenu";

export interface RecruitCardProps {
  id: number;
  title: string;
  subtitle: string;
  members: string;
  image: string;
  applicants?: number; // 나의 모집 모드에서만 사용
  teamOnly?: boolean; // 나의 팀 모드에서만 사용
}

export default function RecruitCard({
  title,
  subtitle,
  members,
  image,
  applicants,
  teamOnly = false,
}: RecruitCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      
      {/* 이미지 영역 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* 카드 내용 */}
      <div className="p-4 relative">

        {/* 점 3개 메뉴 */}
        <div className="absolute top-3 right-3">
          <MoreMenu />
        </div>

        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight min-h-[40px] pr-6">
          {title}
        </p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 인원 */}
        {!teamOnly && (
          <p className="text-sm mt-2">👥 {members} / 지원 {applicants}명</p>
        )}

        {teamOnly && (
          <p className="text-sm mt-2">👥 {members} / 팀원</p>
        )}
      </div>
    </div>
  );
}
