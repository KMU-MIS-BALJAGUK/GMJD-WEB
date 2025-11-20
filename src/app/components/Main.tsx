import React from 'react';
import { MAIN_DATA } from '../page';
import ContestCard from '@/components/common/ContestCard';

const Main = () => {
  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex flex-col items-center">
        <div className="mt-16">
          <p className="text-[20px] font-medium mb-6">
            대외활동엔 <br />
            이것만 한 게 없어요!
          </p>
          <div className="grid-cols-2 xl:grid-cols-4 grid gap-x-6 gap-y-6">
            {MAIN_DATA.map((contest) => {
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
            {MAIN_DATA.map((contest) => {
              return <ContestCard contest={contest} key={contest.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
