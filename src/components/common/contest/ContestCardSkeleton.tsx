export default function ContestCardSkeleton() {
  return (
    <div className="w-full sm:w-[280px] sm:h-[299px] flex flex-col animate-pulse">
      {/* 썸네일 */}
      <div className="w-full sm:w-[280px] h-[200px] bg-gray-200 rounded-lg" />

      {/* 정보 */}
      <div className="pt-3 flex-grow">
        {/* 태그 영역 */}
        <div className="flex items-center gap-[6px] mb-[12px]">
          <div className="w-10 h-5 bg-gray-200 rounded" />
          <div className="w-16 h-5 bg-gray-200 rounded" />
        </div>

        {/* 제목 */}
        <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />

        {/* 주최 */}
        <div className="w-1/2 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
