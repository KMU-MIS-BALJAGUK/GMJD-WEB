import { getContestDetail, getContestTeams } from '@/lib/api/contest';
import ContestHeader from './components/ContestHeader';
import TeamList from './components/TeamList';
import { notFound } from 'next/navigation';

interface ContestDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContestDetailPage({ params }: ContestDetailPageProps) {
  const { id } = await params;
  const contestId = parseInt(id);

  if (isNaN(contestId) || contestId < 1) {
    notFound();
  }

  try {
    const contest = await getContestDetail(contestId);
    const { teams } = await getContestTeams(contestId);

    if (!contest) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        {/* 컨테이너 */}
        <div className="max-w-[1000px] mx-auto px-8 py-8">
          {/* 상단: 제목 + 버튼 */}
          <div className="flex items-end justify-between mb-8">
            {/* 왼쪽: 제목 섹션 */}
            <div className="flex flex-col gap-2">
              {/* D-day 라벨 */}
              <div className="inline-flex items-center justify-center px-2 py-1 bg-[rgba(242,149,62,0.15)] rounded w-fit">
                <span className="text-xs font-semibold text-[#F2953E]">
                  {calculateDday(contest.endDate)}
                </span>
              </div>

              {/* 제목 + 주최 */}
              <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl font-semibold text-[#191919] leading-[130%]">
                  {contest.title}
                </h1>
                <p className="text-[13px] font-medium text-[#888888]">
                  {contest.organizer}
                </p>
              </div>
            </div>

            {/* 오른쪽: 홈페이지 지원 버튼 */}
            {contest.homepageUrl && (
              <a 
                href={contest.homepageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-[220px] h-12 bg-white border border-[#1487F9] rounded-lg text-[15px] font-medium text-[#1487F9] hover:bg-blue-50 transition-colors"
              >
                홈페이지 지원하기
              </a>
            )}
          </div>

          {/* 가로 구분선 */}
          <div className="w-full h-px bg-[#E7E7E7] mb-8" />

          {/* 2열 레이아웃: 왼쪽 432px, 오른쪽 400px */}
          <div className="flex flex-row gap-[168px] items-start">
            {/* 왼쪽: 공모전 정보 */}
            <div className="w-[432px]">
              <ContestHeader contest={contest} />
            </div>

            {/* 오른쪽: 팀 목록 */}
            <div className="w-[400px]">
              <TeamList teams={teams} contestId={contestId} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to load contest:', error);
    throw error;
  }
}

// D-day 계산 함수
function calculateDday(endDate: string) {
  const today = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `D-${diff}` : '마감';
}

export async function generateMetadata({ params }: ContestDetailPageProps) {
  const { id } = await params;
  const contestId = parseInt(id);
  
  try {
    const contest = await getContestDetail(contestId);
    return {
      title: `${contest.title} | 공모전 매칭 플랫폼`,
      description: contest.description.slice(0, 150),
    };
  } catch (error) {
    return {
      title: '공모전 상세 | 공모전 매칭 플랫폼',
      description: '공모전 팀원을 찾고 함께 성장하세요',
    };
  }
}