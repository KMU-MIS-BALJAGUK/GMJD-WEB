'use client';

import React from 'react';
import ContestCard from '@/components/common/contest/ContestCard';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { CATEGORY_MAP } from '@/constants/contest';
import { useContests } from '@/hooks/contest/useContests';
import { ContestItemDto } from '@/features/contest/types/contest-response';
import ContestCardSkeleton from '@/components/common/contest/ContestCardSkeleton';
import { useToast } from '@/components/ui/use-toast';

const Main = () => {
  const { toast } = useToast();

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

  return (
    <div className="w-full px-4 md:px-8">
      <button
        onClick={() =>
          toast({
            title: '토스트 테스트',
            description: '정상적으로 동작합니다 🎉',
            variant: 'default',
          })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        토스트 테스트
      </button>
      <div className="flex flex-col items-center">
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
