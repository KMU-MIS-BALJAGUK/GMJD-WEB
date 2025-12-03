// src/app/team/my_recruit/components/MyRecruitPageClient.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import RecruitManageCard from './RecruitCard';
import MyRecruitPopup from '@/components/popup/my-recruit/MyRecruitPopup';
import { useMyRecruitTeams } from '@/hooks/team/useMyRecruitTeams';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import { Megaphone } from 'lucide-react';

interface PopupTeamData {
  title: string;
  status: '모집중' | '모집완료';
  recruitMember: number;
  applyNumber: number;
}

const normalizeStatus = (
  status: 'OPEN' | 'CLOSED' | '모집중' | '모집완료',
): '모집중' | '모집완료' => {
  switch (status) {
    case 'OPEN':
    case '모집중':
      return '모집중';
    default:
      return '모집완료';
  }
};

export default function MyRecruitPageClient() {
  const { data: recruitTeams, isLoading, isError } = useMyRecruitTeams();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<PopupTeamData | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const handleCardClick = (team: NonNullable<typeof recruitTeams>[number]) => {
    setSelectedTeam({
      title: team.contestName,
      status: normalizeStatus(team.status),
      recruitMember: team.maxMember,
      applyNumber: team.requestedCount,
    });
    setSelectedTeamId(team.teamId);
    setPopupOpen(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">팀 모집 관리</h1>

      <nav className="flex gap-6 mb-8 border-b pb-2 text-sm">
        <Link href="/team" className="text-gray-600 hover:text-black">
          나의 팀
        </Link>
        <span className="font-semibold text-blue border-b-2 border-blue pb-2">나의 모집</span>
        <Link href="/team/my_apply" className="text-gray-600 hover:text-black">
          나의 지원
        </Link>
      </nav>

      {isLoading && <Loading />}
      {isError && <Error message="팀 정보를 불러오는 과정에서 문제가 발생했습니다." />}

      {!isLoading && recruitTeams?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-3">
            <Megaphone className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-700 font-medium text-sm">진행 중인 모집이 없어요.</p>
          <p className="text-gray-500 text-xs mt-1">새로운 모집을 만들어 팀원을 모집해보세요!</p>
        </div>
      )}

      {recruitTeams && recruitTeams.length > 0 && (
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
              status={normalizeStatus(team.status)}
              onClick={() => handleCardClick(team)}
            />
          ))}
        </div>
      )}

      <MyRecruitPopup
        open={popupOpen}
        setOpen={setPopupOpen}
        title={selectedTeam?.title}
        status={selectedTeam?.status}
        recruitMember={selectedTeam?.recruitMember}
        applyNumber={selectedTeam?.applyNumber}
        teamId={selectedTeamId}
      />
    </div>
  );
}
