"use client";

import Image from "next/image";

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
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">

      {/* 이미지 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* 내용 */}
      <div className="p-4">

        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight min-h-[40px]">
          {title}
        </p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 인원 + 역할 */}
        <p className="text-sm mt-2">
          👥 모집 인원 {totalMembers}명 / {role}
        </p>
      </div>
    </div>
  );
}
