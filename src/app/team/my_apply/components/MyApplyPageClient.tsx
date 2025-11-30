'use client';

import Link from 'next/link';
import React from 'react';
import MyApplyCard from './MyApplyCard';
import { useMyAppliedList } from '@/hooks/mypage/useMyAppliedList';
import { ClipboardList } from 'lucide-react';
import Loading from '@/components/common/Loading';

const MyApplyPageClient = () => {
  const { data: myAppliedList, isLoading, isError } = useMyAppliedList();

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">팀 관리</h1>
        <Loading message="지원한 팀 정보를 불러오는 중..." />
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

      {/* 데이터 없음 Empty UI */}
      {(!myAppliedList || myAppliedList.length === 0) && (
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-3">
            <ClipboardList className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-700 font-medium text-sm">지원한 팀이 아직 없어요</p>
          <p className="text-gray-500 text-xs mt-1">새로운 팀에 지원해 협업을 시작해보세요!</p>
        </div>
      )}

      {/* 카드 리스트 */}
      {myAppliedList && myAppliedList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {myAppliedList.map((application) => (
            <MyApplyCard
              key={application.applicationId}
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
      )}
    </div>
  );
};

export default MyApplyPageClient;
