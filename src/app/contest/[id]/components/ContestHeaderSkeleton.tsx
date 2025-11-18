import Skeleton from '@/components/common/Skeleton';

export default function ContestHeaderSkeleton() {
  return (
    <div className="w-[400px] flex flex-col gap-[42px]">
      {/* D-day + 제목 */}
      <div className="w-full h-[60px] flex flex-col gap-[23px]">
        <Skeleton className="w-[80px] h-[18px]" />
        <Skeleton className="w-[250px] h-[18px]" />
      </div>

      {/* 포스터 이미지 */}
      <Skeleton className="w-[219px] h-[248px] mx-auto rounded-[19.84px]" />

      {/* 상세 정보 */}
      <div className="w-full flex flex-row gap-[50px]">
        {/* 왼쪽 컬럼 */}
        <div className="w-[180px] flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[18px]">
            <div className="flex flex-row items-center gap-[10px]">
              <Skeleton className="w-[58px] h-[18px]" />
              <Skeleton className="w-[102px] h-[18px]" />
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <Skeleton className="w-[58px] h-[18px]" />
              <Skeleton className="w-[102px] h-[18px]" />
            </div>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-row items-center gap-[10px]">
              <Skeleton className="w-[58px] h-[18px]" />
              <Skeleton className="w-[102px] h-[18px]" />
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <Skeleton className="w-[58px] h-[18px]" />
              <Skeleton className="w-[120px] h-[18px]" />
            </div>
          </div>
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="w-[180px] flex flex-col gap-[19px]">
          <div className="flex flex-row items-center gap-[10px]">
            <Skeleton className="w-[58px] h-[18px]" />
            <Skeleton className="w-[60px] h-[18px]" />
          </div>

          <div className="flex flex-row items-start gap-[10px]">
            <Skeleton className="w-[58px] h-[18px]" />
            <div className="flex flex-col gap-[2px]">
              <Skeleton className="w-[80px] h-[18px]" />
              <Skeleton className="w-[80px] h-[18px]" />
            </div>
          </div>

          <div className="flex flex-row items-center gap-[10px]">
            <Skeleton className="w-[58px] h-[18px]" />
            <Skeleton className="w-[40px] h-[18px]" />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <Skeleton className="w-[152px] h-[49px] mx-auto" />
    </div>
  );
}