import { fetchContestDetail, fetchContestTeams } from '@/lib/api/contest';
import ContestHeader from './components/ContestHeader';
import TeamList from './components/TeamList';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import type { Metadata } from 'next';

interface ContestDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ContestDetailPage({ params }: ContestDetailPageProps) {
  const contestId = Number(params.id);

  if (!contestId || Number.isNaN(contestId) || contestId < 1) {
    notFound();
  }

  try {
    const contest = await fetchContestDetail(contestId); // ContestDetailDto
    const teams = await fetchContestTeams(contestId);    // ContestTeamItemDto[]

    if (!contest) {
      notFound();
    }

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
              {/* ⚠ ContestHeader가 기대하는 props shape 확인 필요
                  현재 ContestHeader가 title/organizer/endDate 같은 옛 타입을 쓰고 있다면
                  그 컴포넌트도 ContestDetailDto에 맞게 수정이 필요함 */}
              <ContestHeader contest={contest} />
            </div>

            {/* 오른쪽: 팀 목록 */}
            <div className="w-full md:max-w-[760px] lg:w-[400px]">
              <TeamList teams={teams} contestId={contestId} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to load contest:', error);
    // 500 페이지로 던지고 싶으면 throw error;
    notFound(); // 혹은 에러 페이지로 라우팅
  }
}

// "YYYY-MM-DD ~ YYYY-MM-DD" 형식의 duration에서 종료일만 추출
function extractEndDateFromDuration(duration: string): string | null {
  if (!duration) return null;
  const parts = duration.split('~');
  if (parts.length < 2) return null;
  return parts[1].trim();
}

// D-day 계산 함수
function calculateDday(endDateStr: string) {
  const today = new Date();
  const end = new Date(endDateStr);
  if (Number.isNaN(end.getTime())) return '마감일 미정';

  const diff = Math.ceil(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff > 0 ? `D-${diff}` : '마감';
}

export async function generateMetadata({
  params,
}: ContestDetailPageProps): Promise<Metadata> {
  const contestId = Number(params.id);

  if (!contestId || Number.isNaN(contestId)) {
    return {
      title: '공모전 상세 | 공모전 매칭 플랫폼',
      description: '공모전 팀원을 찾고 함께 성장하세요',
    };
  }

  try {
    const contest = await fetchContestDetail(contestId);

    const description =
      contest.additionalBenefits ||
      contest.benefits ||
      `${contest.organizationName}에서 주최하는 ${contest.name} 공모전입니다.`;

    return {
      title: `${contest.name} | 공모전 매칭 플랫폼`,
      description: description.slice(0, 150),
    };
  } catch (error) {
    return {
      title: '공모전 상세 | 공모전 매칭 플랫폼',
      description: '공모전 팀원을 찾고 함께 성장하세요',
    };
  }
}