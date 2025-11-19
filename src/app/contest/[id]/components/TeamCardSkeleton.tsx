import Skeleton from '@/components/common/Skeleton';

export default function TeamCardSkeleton() {
  return (
    <div className="w-[303px] h-[210px] bg-white rounded-[20px] border-2 border-gray-200 p-6 flex flex-col justify-between">
      {/* 상단 */}
      <div className="flex flex-col gap-2.5">
        {/* 제목 */}
        <Skeleton className="w-[140px] h-9" />

        {/* 태그들 */}
        <div className="flex flex-row items-center gap-[15px]">
          <Skeleton className="w-[65px] h-6 rounded-full" />
          <Skeleton className="w-[65px] h-6 rounded-full" />
          <Skeleton className="w-[65px] h-6 rounded-full" />
        </div>

        {/* 모집 인원 */}
        <Skeleton className="w-[120px] h-6" />
      </div>

      {/* 하단: 버튼 */}
      <Skeleton className="w-full h-[49px] rounded-[10px]" />
    </div>
  );
}