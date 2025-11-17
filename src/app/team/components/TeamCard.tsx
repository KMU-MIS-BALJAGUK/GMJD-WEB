"use client";

import Image from "next/image";
import MoreMenu from "@/components/MoreMenu";

export interface TeamCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  role: string; // 팀장 / 팀원
}

export default function TeamCard({
  title,
  subtitle,
  image,
  totalMembers,
  role,
}: TeamCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white relative">

      {/* 이미지 영역 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* 내용 */}
      <div className="p-4 relative">

        {/* 점 3개 메뉴 */}
        <div className="absolute top-3 right-3">
          <MoreMenu
            onEdit={() => console.log("팀 수정")}
            onDelete={() => console.log("팀 삭제")}
          />
        </div>

        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight line-clamp-2 pr-6">
          {title}
        </p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 인원 & 역할 */}
        <p className="text-sm mt-2">
          👥 모집 인원 {totalMembers}명{" "}
          <span className="ml-1 text-gray-600">/ {role}</span>
        </p>
      </div>
    </div>
  );
}
