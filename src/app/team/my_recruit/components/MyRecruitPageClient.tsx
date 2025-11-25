import Link from 'next/link';
import React from 'react';
import RecruitManageCard from './RecruitCard';
import { mockCards } from '../page';

const MyRecruitPageClient = () => {
  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">팀 관리</h1>

      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <Link href="/team" className="text-gray-600 hover:text-black">
          나의 팀
        </Link>

        <span className="font-semibold text-blue border-b-2 border-blue pb-2">나의 모집</span>

        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockCards.map((card) => (
          <RecruitManageCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default MyRecruitPageClient;
