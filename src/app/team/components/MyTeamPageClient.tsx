'use client';

import { useState } from 'react';
import TeamCard from '@/app/team/components/TeamCard';
import Link from 'next/link';
import { useMyTeams } from '@/hooks/team/useMyTeams';
import { useMyRecruitTeams } from '@/hooks/team/useMyRecruitTeams';
import { UsersRound } from 'lucide-react';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import TeamInfoPopup from '@/components/popup/my-team/TeamInfoPopup';

export default function MyTeamPageClient() {
  const { data: myTeams, isLoading: loadingTeams, isError: teamsError } = useMyTeams();
  const {
    data: recruitTeams,
    isLoading: loadingRecruit,
    isError: recruitError,
  } = useMyRecruitTeams();

  const isLoading = loadingTeams || loadingRecruit;
  const isError = teamsError || recruitError;

  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  // 팀장 팀 ID 목록
  const leaderTeamIds = new Set(recruitTeams?.map((team) => team.teamId) ?? []);

  // 팀 데이터에 역할(role) 계산
  const mergedTeams =
    myTeams?.map((team) => ({
      ...team,
      role: leaderTeamIds.has(team.teamId) ? 'LEADER' : 'MEMBER',
    })) ?? [];

  return (
    <div className="max-w-[1200px] mx-auto max-md:py-7 py-10 px-4 md:px-6 lg:px-8">
      <h1 className="max-md:text-xl text-2xl font-bold mb-6">팀 관리</h1>

      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <span className="font-semibold text-[#1487F9] border-b-2 border-[#1487F9] pb-2">나의 팀</span>
        <Link href="/team/my_recruit" className="text-gray-600 hover:text-black">
          나의 모집
        </Link>
        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      {isLoading && <Loading />}

      {isError && <Error message="팀 정보를 불러오는 과정에서 문제가 발생했습니다." />}

      {!myTeams && !isLoading && !isError && (
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-3">
            <UsersRound className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-700 font-medium text-sm">아직 참여한 팀이 없어요.</p>
          <p className="text-gray-500 text-xs mt-1">새로운 프로젝트를 만들어 팀원을 모아보세요!</p>
        </div>
      )}

      {mergedTeams.length > 0 && !isLoading && !isError && (
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
              onClick={(teamId) => setSelectedTeamId(teamId)}
            />
          ))}
        </div>
      )}

      <TeamInfoPopup
        open={selectedTeamId !== null}
        setOpen={(value) => {
          if (!value) setSelectedTeamId(null);
        }}
        teamId={selectedTeamId}
      />
    </div>
  );
}
