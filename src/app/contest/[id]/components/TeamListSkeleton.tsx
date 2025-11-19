import Skeleton from '@/components/common/Skeleton';
import TeamCardSkeleton from './TeamCardSkeleton';

export default function TeamListSkeleton() {
  return (
    <div className="w-[650px]">
      {/* 상단: 팀 만들기 버튼 */}
      <div className="flex justify-end mb-[27px]">
        <Skeleton className="w-[131px] h-[31px] rounded-[18px]" />
      </div>

      {/* 팀 카드 그리드 (2열) */}
      <div className="grid grid-cols-2 gap-x-[43px] gap-y-[43px]">
        <TeamCardSkeleton />
        <TeamCardSkeleton />
        <TeamCardSkeleton />
        <TeamCardSkeleton />
      </div>
    </div>
  );
}