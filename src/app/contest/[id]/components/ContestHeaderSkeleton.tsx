import Skeleton from '@/components/common/Skeleton';

export default function ContestHeaderSkeleton() {
  return (
    <div className="w-[432px] flex flex-col gap-10">
      {/* 상세 정보 (2열) */}
      <div className="flex gap-[70px]">
        {/* 왼쪽 컬럼 */}
        <div className="flex flex-col gap-5">
          <Skeleton className="w-[133px] h-[15px]" />
          <Skeleton className="w-[133px] h-[15px]" />
          <Skeleton className="w-[122px] h-[15px]" />
          <Skeleton className="w-[118px] h-[15px]" />
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="flex flex-col gap-5">
          <Skeleton className="w-[148px] h-[15px]" />
          <Skeleton className="w-[227px] h-[15px]" />
          <Skeleton className="w-[161px] h-[15px]" />
          <Skeleton className="w-[135px] h-[30px] rounded-full" />
        </div>
      </div>

      {/* 포스터 이미지 */}
      <Skeleton className="w-full h-[611px] rounded-lg" />
    </div>
  );
}