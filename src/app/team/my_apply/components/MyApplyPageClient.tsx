'use client';

import Link from 'next/link';
import React from 'react';
import MyApplyCard from './MyApplyCard';
import { useMyAppliedList } from '@/hooks/mypage/useMyAppliedList';

const MyApplyPageClient = () => {
  const { data: myAppliedList, isLoading, isError } = useMyAppliedList();

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">팀 관리</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">팀 관리</h1>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

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
        {myAppliedList && myAppliedList.map((application) => (
          <MyApplyCard
            key={application.applicationId} // Use applicationId as key for uniqueness
            teamId={application.teamId}
            applicationId={application.applicationId}
            title={application.contestName}
            subtitle={application.teamTitle}
            image={application.contestImageUrl}
            totalMembers={application.memberCount}
            status={application.status === 'REJECTED' ? 'closed' : 'open'}
          />
        ))}
      </div>
    </div>
  );
};

export default MyApplyPageClient;
