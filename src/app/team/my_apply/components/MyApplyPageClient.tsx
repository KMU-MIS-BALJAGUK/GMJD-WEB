import Link from 'next/link';
import React from 'react';
import MyApplyCard from './MyApplyCard';
import { mockApplies } from '../page';

const MyApplyPageClient = () => {
  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
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
};

export default MyApplyPageClient;
