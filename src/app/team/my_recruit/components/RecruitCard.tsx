"use client";

import Image from "next/image";
import MoreMenu from "@/components/MoreMenu";

export interface RecruitManageCardProps {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  totalMembers: number;
  applicants: number;
  status: "open" | "closed";
}

export default function RecruitManageCard({
  title,
  subtitle,
  image,
  totalMembers,
  applicants,
  status,
}: RecruitManageCardProps) {
  const isOpen = status === "open";

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white relative">

      {/* 이미지 */}
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />

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

        {/* 점 3개 메뉴 */}
        <div className="absolute top-3 right-3">
          <MoreMenu
            onEdit={() => console.log("모집 공고 수정")}
            onDelete={() => console.log("모집 공고 삭제")}
          />
        </div>

        {/* 제목 */}
        <p className="font-semibold text-sm leading-tight line-clamp-2 pr-6">
          {title}
        </p>

        {/* 기관명 */}
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        {/* 모집 현황 */}
        <p className="text-sm mt-2">
          👥 모집 인원 {totalMembers}명{" "}
          <span className="text-blue-500 font-semibold ml-1">
            / 지원 {applicants}명
          </span>
        </p>
      </div>
    </div>
  );
}
