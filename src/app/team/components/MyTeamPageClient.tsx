'use client';

import TeamCard from '@/app/team/components/TeamCard';
import Link from 'next/link';
import { useMyTeams } from '@/hooks/team/useMyTeams';
import { useMyRecruitTeams } from '@/hooks/team/useMyRecruitTeams';

export default function MyTeamPageClient() {
  const { data: myTeams, isLoading: loadingTeams, isError: teamsError } = useMyTeams();
  const {
    data: recruitTeams,
    isLoading: loadingRecruit,
    isError: recruitError,
  } = useMyRecruitTeams();

  const isLoading = loadingTeams || loadingRecruit;
  const isError = teamsError || recruitError;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
        <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>
        <p>로딩 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
        <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  // 팀장 팀 ID 목록
  const leaderTeamIds = new Set(recruitTeams?.map((team) => team.teamId) ?? []);

  // 팀 merged + 역할(role) 계산
  const mergedTeams =
    myTeams?.map((team) => ({
      ...team,
      role: leaderTeamIds.has(team.teamId) ? 'LEADER' : 'MEMBER',
    })) ?? [];

  // 빈 목록 처리
  if (mergedTeams.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
        <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>

        <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
          <span className="font-semibold text-[#1487F9] border-b-2 border-[#1487F9] pb-2">
            나의 팀
          </span>
          <Link href="/team/my_recruit" className="text-gray-600 hover:text-black">
            나의 모집
          </Link>
          <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
            나의 지원
          </Link>
        </nav>

        <p className="text-gray-500">나의 팀이 존재하지 않습니다.</p>
      </div>
    );
  }

  // 정상 렌더링
  return (
    <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
      {/* 제목 */}
      <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>

      {/* 탭 메뉴 */}
      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <span className="font-semibold text-[#1487F9] border-b-2 border-[#1487F9] pb-2">
          나의 팀
        </span>
        <Link href="/team/my_recruit" className="text-gray-600 hover:text-black">
          나의 모집
        </Link>
        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mergedTeams.map((team) => (
          <TeamCard
            key={team.teamId}
            id={team.teamId}
            title={team.contestName}
            subtitle={team.contestOrganizationName}
            image={team.contestImageUrl}
            totalMembers={team.memberCount}
            role={team.role === 'LEADER' ? '팀장' : '팀원'}
          />
        ))}
      </div>
    </div>
  );
}
