"use client";

import Image from "next/image";

export interface RecruitCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  applicants: number;
  status: "open" | "closed";
}

export default function RecruitCard({
  title,
  subtitle,
  image,
  totalMembers,
  applicants,
  status,
}: RecruitCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative bg-white">

      {/* 이미지 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

        {/* 상태 배지 — 이미지 좌측 하단 */}
        <div className="absolute bottom-2 left-2 z-10">
          {status === "open" ? (
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
      <div className="p-4">

        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight min-h-[40px]">
          {title}
        </p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 인원 / 지원 인원 */}
        <p className="text-sm mt-2">
          👥 모집 인원 {totalMembers}명{" "}
          <span className="text-blue-500 font-medium text-sm ml-1">
            / 지원 {applicants}명
          </span>
        </p>
      </div>
    </div>
  );
}
