"use client";

import Image from "next/image";

export interface MyApplyCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  applicants: number;
  status: "open" | "closed";
}

export default function MyApplyCard({
  title,
  subtitle,
  image,
  totalMembers,
  applicants,
  status,
}: MyApplyCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">

      {/* 이미지 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* 상태 배지 */}
        <div className="absolute bottom-2 left-2">
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

      {/* 카드 내용 */}
      <div className="p-4">
        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight line-clamp-2">
          {title}
        </p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 / 지원 */}
        <p className="text-sm mt-2">
          👥 모집 인원 {totalMembers}명{" "}
          <span className="text-blue-500 font-semibold ml-1">/ {applicants}명 응원</span>
        </p>

        {/* 버튼 */}
        <div className="mt-4">
          {status === "open" ? (
            <button className="w-full bg-red-100 text-red-500 font-semibold py-2 rounded">
              신청 취소
            </button>
          ) : (
            <button className="w-full bg-gray-100 text-gray-600 font-semibold py-2 rounded">
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
