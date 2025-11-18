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
        <div className="max-w-[1180px] mx-auto px-8 py-12">
          {/* 2열 레이아웃 */}
          <div className="flex flex-row gap-[168px] items-start">
            {/* 왼쪽: 공모전 정보 (고정) */}
            <div className="w-[400px] sticky top-8">
              <ContestHeader contest={contest} />
            </div>

            {/* 오른쪽: 팀 목록 (스크롤) */}
            <div className="w-[650px] flex-1">
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