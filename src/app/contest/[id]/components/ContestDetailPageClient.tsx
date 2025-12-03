'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Button from '@/components/common/Button';
import ContestHeader from './ContestHeader';
import TeamList from './TeamList';

import { fetchContestDetail, fetchContestTeams } from '@/lib/api/contest';
import type { ContestDetailDto } from '@/features/contest/types/ContestDetailResponse';
import type { ContestTeamItemDto } from '@/features/contest/types/ContestTeamListResponse';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';

interface ContestDetailPageClientProps {
  contestId: number;
}

// 종료일 & D-day 계산
const extractEndDateFromDuration = (duration: string | undefined): string | null => {
  if (!duration) return null;
  const parts = duration.split('~');
  if (parts.length < 2) return null;
  return parts[1].trim();
};

const calculateDday = (endDateStr: string) => {
  const today = new Date();
  const end = new Date(endDateStr);
  if (Number.isNaN(end.getTime())) return '마감일 미정';

  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `D-${diff}` : '마감';
};

export default function ContestDetailPageClient({ contestId }: ContestDetailPageClientProps) {
  // 공모전 상세
  const {
    data: contest,
    isLoading: isContestLoading,
    isError: isContestError,
  } = useQuery<ContestDetailDto>({
    queryKey: ['contestDetail', contestId],
    queryFn: () => fetchContestDetail(contestId),
  });

  // 팀 목록
  const {
    data: teams = [],
    isLoading: isTeamsLoading,
    isError: isTeamsError,
  } = useQuery<ContestTeamItemDto[]>({
    queryKey: ['contestTeams', contestId],
    queryFn: () => fetchContestTeams(contestId),
  });

  const isLoading = isContestLoading;
  const isError = isContestError || !contest;

  // 로딩 상태
  if (isLoading) {
    return <Loading message="공모전 정보를 불러오는 중입니다..." />;
  }

  // 에러 / contest 없음
  if (isError) {
    return <Error message="공모전 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요." />;
  }

  // 여기까지 왔으면 contest는 반드시 존재
  const endDate = extractEndDateFromDuration(contest.duration);
  const ddayLabel = endDate ? calculateDday(endDate) : '마감일 미정';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-4 md:px-20 lg:px-8 py-8">
        {/* 상단: 제목 + 버튼 */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex flex-col gap-2">
            {/* D-day 라벨 */}
            <div className="inline-flex items-center justify-center px-2 py-1 bg-[rgba(242,149,62,0.15)] rounded w-fit">
              <span className="text-xs font-semibold text-[#F2953E]">{ddayLabel}</span>
            </div>

            {/* 제목 + 주최 */}
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-semibold text-[#191919] leading-[130%]">
                {contest.name}
              </h1>
              <p className="text-[13px] font-medium text-[#888888]">{contest.organizationName}</p>
            </div>
          </div>

          {/* 오른쪽: 홈페이지 지원 버튼 */}
          {contest.siteUrl && (
            <Link
              href={contest.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="max-sm:hidden"
            >
              <Button variant="secondary" className="w-[220px]">
                홈페이지 지원하기
              </Button>
            </Link>
          )}
        </div>

        {/* 가로 구분선 */}
        <div className="w-full h-px bg-[#E7E7E7] mb-8" />

        {/* 2열 레이아웃 */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[168px] items-center lg:items-start">
          {/* 왼쪽: 공모전 정보 */}
          <div className="w-full md:max-w-[660px] lg:w-[432px]">
            <ContestHeader contest={contest} />
          </div>

          {/* 오른쪽: 팀 목록 */}
          <div className="w-full md:max-w-[760px] lg:w-[400px]">
            <TeamList
              contestId={contestId}
              teams={teams}
              isLoading={isTeamsLoading}
              isError={isTeamsError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
