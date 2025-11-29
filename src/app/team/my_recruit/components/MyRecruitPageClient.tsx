//src/app/team/my_recruit/components/MyRecruitPageClient.tsx

'use client';

import Link from 'next/link';
import RecruitManageCard from './RecruitCard';
import { useMyRecruitTeams } from '@/hooks/team/useMyRecruitTeams';

export default function MyRecruitPageClient() {
  const {
    data: recruitTeams,
    isLoading,
    isError,
  } = useMyRecruitTeams();

  const convertStatus = (status: 'OPEN' | 'CLOSED'): 'open' | 'closed' =>
    status === 'OPEN' ? 'open' : 'closed';

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">팀 관리</h1>
        <p>로딩 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">팀 관리</h1>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  // 빈 목록
  if (!recruitTeams || recruitTeams.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">팀 관리</h1>

        <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
          <Link href="/team" className="text-gray-600 hover:text-black">
            나의 팀
          </Link>
          <span className="font-semibold text-blue border-b-2 border-blue pb-2">나의 모집</span>
          <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
            나의 지원
          </Link>
        </nav>

        <p className="text-gray-500">팀장으로 모집 중인 팀이 없습니다.</p>
      </div>
    );
  }

  // 정상 렌더링
  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">팀 관리</h1>

      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <Link href="/team" className="text-gray-600 hover:text-black">
          나의 팀
        </Link>
        <span className="font-semibold text-blue border-b-2 border-blue pb-2">나의 모집</span>
        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recruitTeams.map((team) => (
          <RecruitManageCard
            key={team.teamId}
            id={team.teamId}
            title={team.contestName}
            subtitle={team.contestOrganizationName}
            image={team.contestImageUrl}
            totalMembers={team.maxMember}
            applicants={team.requestedCount}
            status={convertStatus(team.status)}
          />
        ))}
      </div>
    </div>
  );
}
