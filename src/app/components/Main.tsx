'use client';

import React from 'react';
import ContestCard from '@/components/common/contest/ContestCard';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { CATEGORY_MAP } from '@/constants/contest';
import { useContests } from '@/hooks/contest/useContests';
import { ContestItemDto } from '@/features/contest/types/contest-response';
import ContestCardSkeleton from '@/components/common/contest/ContestCardSkeleton';
import { Package } from 'lucide-react';

const Main = () => {
  const { data: user, isLoading: userLoading } = useUserProfile(); // 스켈레톤 UI
  console.log(user);
  const isLoggedIn = !!user;
  const recommendContestsParams =
    isLoggedIn && user.categoryList?.length > 0
      ? {
          sortType: 'popular' as const,
          page: 0,
          size: 4,
          interest: CATEGORY_MAP[user.categoryList[0]],
        }
      : {
          sortType: 'popular' as const,
          page: 0,
          size: 4,
        };

  const upcomingDeadlineContestsParams = {
    sortType: 'deadline' as const,
    page: 0,
    size: 4,
  };

  const { data: recommendContestsData, isLoading: recommendLoading } = useContests({
    params: recommendContestsParams,
  });
  const { data: upcomingDeadlineContestsData, isLoading: upcomingDeadlineLoading } = useContests({
    params: upcomingDeadlineContestsParams,
  });

  const isEmpty =
    !recommendLoading &&
    !upcomingDeadlineLoading &&
    (recommendContestsData?.contests?.length ?? 0) === 0 &&
    (upcomingDeadlineContestsData?.contests?.length ?? 0) === 0;

  function FullEmptyState() {
    return (
      <div className="flex flex-col items-center justify-center w-full py-20 text-center px-4">
        <div className="p-4 bg-bg-02 rounded-full mb-3">
          <Package className="w-10 h-10 text-text-03" />
        </div>

        <p className="text-text-02 text-sm font-medium">표시할 공모전이 없어요</p>
        <p className="text-text-04 text-xs mt-1">잠시 후 다시 시도해 주세요!</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex flex-col items-center">
        {isEmpty && <FullEmptyState />}
        <div className="mt-16">
          <p className="text-[20px] font-medium mb-6">
            대외활동엔 <br />
            이것만 한 게 없어요!
          </p>
          <div className="grid-cols-2 xl:grid-cols-4 grid gap-x-6 gap-y-6">
            {recommendLoading
              ? Array.from({ length: 4 }).map((_, i) => <ContestCardSkeleton key={i} />)
              : recommendContestsData?.contests?.map((contest: ContestItemDto) => (
                  <ContestCard contest={contest} key={contest.id} />
                ))}
          </div>
        </div>
        <div className="mt-16 mb-16">
          <p className="text-[20px] font-medium mb-6">
            곧 마감이
            <br />
            다가오는 공모전이에요
          </p>
          <div className="grid-cols-2 xl:grid-cols-4 grid gap-x-6 gap-y-6">
            {upcomingDeadlineLoading
              ? Array.from({ length: 4 }).map((_, i) => <ContestCardSkeleton key={i} />)
              : upcomingDeadlineContestsData?.contests?.map((contest: ContestItemDto) => {
                  return <ContestCard contest={contest} key={contest.id} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
