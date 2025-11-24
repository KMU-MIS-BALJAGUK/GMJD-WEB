import Skeleton from '@/components/common/Skeleton';
import TeamCardSkeleton from './TeamCardSkeleton';

export default function TeamListSkeleton() {
  return (
    <div className="w-full bg-[#F7F7F7] border-b border-[#E7E7E7] p-10 rounded-b-lg">
      {/* 상단: 제목 + 페이지네이션 */}
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="w-[74px] h-[26px]" />
        <Skeleton className="w-[83px] h-[24px]" />
      </div>

      {/* 팀 카드 목록 (1열) */}
      <div className="flex flex-col gap-3">
        {/* 팀 만들기 버튼 스켈레톤 */}
        <Skeleton className="w-full h-[137px] rounded-[10px]" />

        {/* 팀 카드 스켈레톤 3개 */}
        <TeamCardSkeleton />
        <TeamCardSkeleton />
        <TeamCardSkeleton />
      </div>
    </div>
  );
}