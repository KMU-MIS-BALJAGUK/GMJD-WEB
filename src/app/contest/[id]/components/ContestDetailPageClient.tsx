'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Button from '@/components/common/Button';

import ContestHeader from './ContestHeader';
import TeamList from './TeamList';
import ContestHeaderSkeleton from './ContestHeaderSkeleton';
// TeamListSkeleton 나중에 만들기
// import TeamListSkeleton from './TeamListSkeleton';

import { fetchContestDetail, fetchContestTeams } from '@/lib/api/contest';
import type { ContestDetailDto } from '@/features/contest/types/ContestDetailResponse';
import type { ContestTeamItemDto } from '@/features/contest/types/ContestTeamListResponse';
import axios from 'axios';

interface ContestDetailPageClientProps {
  contestId: number;
}

export default function ContestDetailPageClient({
    contestId,
  }: ContestDetailPageClientProps) {
    //  공모전 상세
    const {
      data: contest,
      isLoading: isContestLoading,
      error: contestError,
    } = useQuery<ContestDetailDto>({
      queryKey: ['contestDetail', contestId],
      queryFn: () => fetchContestDetail(contestId),
      staleTime: 1000 * 60 * 5,
    });
  
    //  공모전별 팀 목록
    const {
      data: teams,
      isLoading: isTeamsLoading,
      error: teamsError,
    } = useQuery<ContestTeamItemDto[]>({
      queryKey: ['contestTeams', contestId],
      queryFn: () => fetchContestTeams(contestId),
      enabled: !!contestId,
      staleTime: 1000 * 60,
    });
  
    //  로딩 상태: 상단/우측 각각 스켈레톤
    if (isContestLoading) {
      return (
        <div className="min-h-screen bg-white">
          <div className="max-w-[1000px] mx-auto px-4 md:px-20 lg:px-8 py-8">
            {/* 상단 스켈레톤 */}
            <div className="flex items-end justify-between mb-8">
              <div className="flex flex-col gap-2 w-full max-w-[600px]">
                <div className="w-16 h-5 bg-gray-100 rounded" />
                <div className="h-7 w-64 bg-gray-100 rounded" />
                <div className="h-4 w-40 bg-gray-100 rounded" />
              </div>
              <div className="hidden sm:block w-[220px] h-10 bg-gray-100 rounded" />
            </div>
  
            <div className="w-full h-px bg-[#E7E7E7] mb-8" />
  
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-[168px] items-center lg:items-start">
              <div className="w-full md:max-w-[660px] lg:w-[432px]">
                <ContestHeaderSkeleton />
              </div>
              <div className="w-full md:max-w-[760px] lg:w-[400px]">
                {/* TeamListSkeleton 없으면 임시 박스 */}
                <div className="w-full h-[300px] bg-gray-50 border border-gray-100 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    //  에러 상태 (403 포함)
    if (contestError) {
      let message =
        '공모전 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.';
  
      if (axios.isAxiosError(contestError)) {
        const status = contestError.response?.status;
        if (status === 403) {
          message =
            '로그인이 필요한 페이지입니다. 오른쪽 상단에서 먼저 로그인해 주세요.';
        }
      }
  
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-700">{message}</p>
            <Link href="/">
              <Button variant="secondary">홈으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      );
    }
  
    if (!contest) return null;
  
    // D-day 라벨 계산
    const endDate = extractEndDateFromDuration(contest.duration);
    const ddayLabel = endDate ? calculateDday(endDate) : '마감일 미정';
  
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1000px] mx-auto px-4 md:px-20 lg:px-8 py-8">
          {/* 상단: 제목 + 버튼 */}
          <div className="flex items-end justify-between mb-8">
            {/* 왼쪽: 제목 섹션 */}
            <div className="flex flex-col gap-2">
              {/* D-day 라벨 */}
              <div className="inline-flex items-center justify-center px-2 py-1 bg-[rgba(242,149,62,0.15)] rounded w-fit">
                <span className="text-xs font-semibold text-[#F2953E]">
                  {ddayLabel}
                </span>
              </div>
  
              {/* 제목 + 주최 */}
              <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl font-semibold text-[#191919] leading-[130%]">
                  {contest.name}
                </h1>
                <p className="text-[13px] font-medium text-[#888888]">
                  {contest.organizationName}
                </p>
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
              {isTeamsLoading ? (
                <div className="w-full h-[300px] bg-gray-50 border border-gray-100 rounded-lg" />
              ) : (
                <TeamList
                  teams={teams ?? []}
                  contestId={contestId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  /** "YYYY-MM-DD ~ YYYY-MM-DD" 형식의 duration에서 종료일 추출 */
  function extractEndDateFromDuration(duration: string): string | null {
    if (!duration) return null;
    const parts = duration.split('~');
    if (parts.length < 2) return null;
    return parts[1].trim();
  }
  
  /** D-day 계산 */
  function calculateDday(endDateStr: string) {
    const today = new Date();
    const end = new Date(endDateStr);
    if (Number.isNaN(end.getTime())) return '마감일 미정';
  
    const diff = Math.ceil(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? `D-${diff}` : '마감';
  }