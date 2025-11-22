import ContestHeaderSkeleton from './components/ContestHeaderSkeleton';
import TeamListSkeleton from './components/TeamListSkeleton';
import Skeleton from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-8 py-8">
        {/* 상단: 제목 + 버튼 */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[37px] h-[26px] rounded" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="w-[350px] h-[31px]" />
              <Skeleton className="w-[100px] h-[17px]" />
            </div>
          </div>
          <Skeleton className="w-[220px] h-12 rounded-lg" />
        </div>

        {/* 가로 구분선 */}
        <div className="w-full h-px bg-[#E7E7E7] mb-8" />

        {/* 2열 레이아웃 */}
        <div className="flex flex-row gap-[168px] items-start">
          <div className="w-[432px]">
            <ContestHeaderSkeleton />
          </div>

          <div className="w-[400px]">
            <TeamListSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}