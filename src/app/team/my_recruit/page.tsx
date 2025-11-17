"use client";

import RecruitCard from "@/components/RecruitCard";
import Link from "next/link";

// 임시 데이터
const mockCards = [
  {
    id: 1,
    title: "NH농협카드 플레이토&스터디 디자인 콘테스트",
    subtitle: "NH농협카드",
    members: "모집 인원 2명",
    applicants: 4,
    image: "/poster1.png",
    status: "모집중",
  },
  {
    id: 2,
    title: "키움증권 사회 청년희망 프로그램 영상 공모전",
    subtitle: "키움증권",
    members: "모집 인원 2명",
    applicants: 4,
    image: "/poster2.png",
    status: "모집중",
  },
  {
    id: 3,
    title: "서울시 2024 대학 광고동아리 광고제",
    subtitle: "서울특별시",
    members: "모집 인원 2명",
    applicants: 4,
    image: "/poster3.png",
    status: "모집중",
  },
  {
    id: 4,
    title: "한국방송통신대학교 상징물 캐릭터 공모전",
    subtitle: "한국방송통신대학교",
    members: "모집 인원 2명",
    applicants: 4,
    image: "/poster4.png",
    status: "모집중",
  },
  {
    id: 5,
    title: "서울시 2024 대학 광고동아리 광고제",
    subtitle: "서울특별시",
    members: "모집 인원 2명",
    applicants: 4,
    image: "/poster3.png",
    status: "모집중",
  },
  {
    id: 6,
    title: "한국방송통신대학교 상징물 캐릭터, 로고, 배지 디자인 공모전",
    subtitle: "한국방송통신대학교",
    members: "모집 인원 2명",
    applicants: 4,
    image: "/poster4.png",
    status: "모집중",
  },
];

export default function MyRecruitPage() {
  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4">

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-6">팀 관리</h1>

      {/* 탭 메뉴 */}
      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <Link href="/team" className="text-gray-600 hover:text-black">
          나의 팀
        </Link>

        <span className="font-semibold text-[#1487F9] border-b-2 border-[#1487F9] pb-2">
          나의 모집
        </span>

        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockCards.map((card) => (
          <RecruitCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
