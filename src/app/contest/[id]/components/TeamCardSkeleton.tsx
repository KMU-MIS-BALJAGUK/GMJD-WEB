import Skeleton from '@/components/common/Skeleton';

export default function TeamCardSkeleton() {
  return (
    <div className="w-full bg-white border border-[#E7E7E7] rounded-[10px] p-6 flex flex-col gap-6">
      {/* 상단 */}
      <div className="flex flex-col gap-4">
        {/* 제목 */}
        <Skeleton className="w-[200px] h-[22px]" />

        {/* 태그들 */}
        <div className="flex items-center gap-1">
          <Skeleton className="w-[58px] h-[25px] rounded" />
          <Skeleton className="w-[54px] h-[25px] rounded" />
          <Skeleton className="w-[54px] h-[25px] rounded" />
        </div>

        {/* 모집인원 */}
        <Skeleton className="w-[105px] h-[17px]" />
      </div>

      {/* 버튼 */}
      <Skeleton className="w-full h-10 rounded-lg" />
    </div>
  );
}
