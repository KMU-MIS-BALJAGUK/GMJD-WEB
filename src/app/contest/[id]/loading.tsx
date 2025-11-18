import ContestHeaderSkeleton from './components/ContestHeaderSkeleton';
import TeamListSkeleton from './components/TeamListSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1180px] mx-auto px-4 py-8">
        <div className="flex flex-row gap-[130px]">
          {/* 왼쪽: 공모전 정보 스켈레톤 */}
          <div className="w-[400px]">
            <ContestHeaderSkeleton />
          </div>

          {/* 오른쪽: 팀 목록 스켈레톤 */}
          <div className="w-[650px]">
            <TeamListSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}