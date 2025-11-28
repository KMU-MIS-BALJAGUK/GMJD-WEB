'use client';

import React from 'react';
import ContestCard from '@/components/common/ContestCard';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { CATEGORY_MAP } from '@/constants/contest';
import { useContests } from '@/hooks/contest/useContests';
import { ContestItemDto } from '@/features/contest/types/contest-response';

const Main = () => {
  const { data: user, isLoading: userLoading } = useUserProfile();
  console.log(user);
  const isLoggedIn = !!user;
  const recommendContestsParams = isLoggedIn && user.categoryList?.length > 0
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
      <div className="flex flex-col items-center">
        <div className="mt-16">
          <p className="text-[20px] font-medium mb-6">
            대외활동엔 <br />
            이것만 한 게 없어요!
          </p>
          <div className="grid-cols-2 xl:grid-cols-4 grid gap-x-6 gap-y-6">
            {recommendContestsData?.contests?.map((contest: ContestItemDto) => {
              return <ContestCard contest={contest} key={contest.id} />;
            })}
          </div>
        </div>
        <div className="mt-16 mb-16">
          <p className="text-[20px] font-medium mb-6">
            곧 마감이
            <br />
            다가오는 공모전이에요
          </p>
          <div className="grid-cols-2 xl:grid-cols-4 grid gap-x-6 gap-y-6">
            {upcomingDeadlineContestsData?.contests?.map((contest: ContestItemDto) => {
              return <ContestCard contest={contest} key={contest.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
