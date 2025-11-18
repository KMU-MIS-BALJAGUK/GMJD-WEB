"use client";

import MyApplyCard from "@/app/team/my_apply/components/MyApplyCard";
import Link from "next/link";

// 임시 데이터
const mockApplies = [
  {
    id: 1,
    title: "NH농협카드 플레이토&스터디 디자인 콘테스트",
    subtitle: "아이디어 기획 파트 1명 구합니다",
    image: "/poster1.png",
    totalMembers: 2,
    applicants: 4,
    status: "open",
  },
  {
    id: 2,
    title: "NH농협카드 플레이토&스터디 디자인 콘테스트",
    subtitle: "아이디어 기획 파트 1명 구합니다",
    image: "/poster1.png",
    totalMembers: 2,
    applicants: 4,
    status: "open",
  },
  {
    id: 3,
    title: "NH농협카드 플레이토&스터디 디자인 콘테스트",
    subtitle: "아이디어 기획 파트 1명 구합니다",
    image: "/poster1.png",
    totalMembers: 2,
    applicants: 4,
    status: "closed",
  },
];

export default function MyApplyPage() {
  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4">

      <h1 className="text-2xl font-bold mb-6">팀 관리</h1>

      {/* 탭 */}
      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <Link href="/team" className="text-gray-600 hover:text-black">
          나의 팀
        </Link>
        <Link href="/team/my_recruit" className="text-gray-600 hover:text-black">
          나의 모집
        </Link>
        <span className="font-semibold text-[#1487F9] border-b-2 border-[#1487F9] pb-2">
          나의 지원
        </span>
      </nav>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockApplies.map((card) => (
          <MyApplyCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
