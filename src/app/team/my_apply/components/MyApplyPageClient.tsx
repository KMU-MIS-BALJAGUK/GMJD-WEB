'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import MyApplyCard from './MyApplyCard';
import { useMyAppliedList } from '@/hooks/mypage/useMyAppliedList';
import { ClipboardList } from 'lucide-react';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import TeamInfoPopup from '@/components/popup/my-team/TeamInfoPopup';

export default function MyApplyPageClient() {
  const { data: myAppliedList, isLoading, isError } = useMyAppliedList();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const handleCardClick = (teamId: number) => {
    setSelectedTeamId(teamId);
  };

  const normalizeRecruitStatus = (
    status: 'OPEN' | 'CLOSED' | '모집중' | '모집완료' | string | undefined,
    fallbackStatus?: string,
  ): '모집중' | '모집완료' => {
    const primary = status ?? fallbackStatus;
    if (primary === 'OPEN' || primary === '모집중') return '모집중';
    if (primary === 'CLOSED' || primary === '모집완료') return '모집완료';
    return '모집완료';
  };

  const normalizeApplicationStatus = (status: unknown): 'PENDING' | 'ACCEPTED' | 'REJECTED' => {
    if (status === 'ACCEPTED' || status === 'REJECTED') return status;
    return 'PENDING';
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">팀 관리</h1>

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

        {isLoading && <Loading />}

        {isError && <Error message="팀 정보를 불러오는 과정에서 문제가 발생했습니다." />}

        {!isLoading && myAppliedList?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <div className="p-4 bg-gray-100 rounded-full mb-3">
              <ClipboardList className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 font-medium text-sm">지원한 팀이 아직 없어요.</p>
            <p className="text-gray-500 text-xs mt-1">새로운 공모전에 지원해 보세요!</p>
          </div>
        )}

        {myAppliedList && myAppliedList.length > 0 && !isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {myAppliedList.map((item) => {
              const recruitStatus = normalizeRecruitStatus(item.recruitStatus as any, item.status as any);
              const applicationStatus = normalizeApplicationStatus(item.status);

              return (
                <MyApplyCard
                  key={item.teamId}
                  teamId={item.teamId}
                  title={item.contestName}
                  subtitle={item.teamTitle}
                  image={item.contestImageUrl}
                  memberCount={item.memberCount}
                  maxMember={item.maxMember}
                  status={applicationStatus}
                  recruitStatus={recruitStatus}
                  requestedCount={item.requestedCount ?? 0}
                  onCardClick={handleCardClick}
                />
              );
            })}
          </div>
        )}
      </div>

      {selectedTeamId && (
        <TeamInfoPopup open={!!selectedTeamId} setOpen={() => setSelectedTeamId(null)} teamId={selectedTeamId} />
      )}
    </>
  );
}
