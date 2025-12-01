'use client';

import { useState } from 'react';
import { BookUser, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

import TeamCard from './TeamCard';
import MakeTeamPopup from '@/components/popup/contest-detail/MakeTeamPopup';
import RequestPopup from '@/components/popup/contest-detail/RequestPopup';

import type { ContestTeamItemDto } from '@/features/contest/types/ContestTeamListResponse';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { useRouter } from 'next/navigation';
import LayerPopup from '@/components/common/layerpopup/LayerPopup';
import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';

interface TeamListProps {
  contestId: number;
  teams: ContestTeamItemDto[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function TeamList({ teams, contestId, isLoading, isError }: TeamListProps) {
  // 💡 모든 훅은 컴포넌트 최상단에서, 조건문 밖에서만 호출
  const [isMakeTeamOpen, setIsMakeTeamOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const safeTeams = teams ?? [];
  const teamsPerPage = 3;

  const { data: user } = useUserProfile();
  const isLoggedIn = !!user;
  const router = useRouter();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(safeTeams.length / teamsPerPage));
  const startIndex = (currentPage - 1) * teamsPerPage;
  const currentTeams = safeTeams.slice(startIndex, startIndex + teamsPerPage);

  const handleOpenRequest = (teamId: number) => {
    setSelectedTeamId(teamId);
    setIsRequestOpen(true);
  };

  const handleMakeTeam = () => {
    if (!isLoggedIn) {
      setIsLoginPopupOpen(true);
      return;
    }
    setIsMakeTeamOpen(true);
  };

  // 로딩/에러/정상 데이터를 JSX 안에서 분기
  const renderTeamListBody = () => {
    if (isLoading) {
      return <Loading message="팀 목록을 불러오는 중입니다..." />;
    }

    if (isError) {
      return <Error message="팀 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요." />;
    }

    return (
      <>
        {/* 팀 카드들 */}
        {currentTeams.map((team) => (
          <TeamCard
            key={team.teamId}
            team={team}
            onClickApply={() => handleOpenRequest(team.teamId)}
          />
        ))}

        {/* 팀이 하나도 없을 때 */}
        {safeTeams.length === 0 && (
          <div className="flex flex-col items-center gap-3 mt-4">
            <BookUser size={28} className="text-[#AAAAAA]" />
            <span className="text-sm text-[#888888] text-center">
              아직 등록된 팀이 없어요.
              <br />
              가장 먼저 팀을 만들어보세요!
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="w-full bg-bg-02 border-b border-border-01 p-4 py-10 rounded-b-lg">
        {/* 상단: 제목 + 페이지네이션 */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-text-01">팀원 모집</h2>

          {/* 페이지네이션 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft size={24} className="text-[#555555] cursor-pointer" />
            </button>
            <span className="text-sm text-text-01 min-w-[40px] text-center">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight size={24} className="text-[#555555] cursor-pointer" />
            </button>
          </div>
        </div>

        {/* 팀 카드 목록 */}
        <div className="flex flex-col gap-3">
          {/* 팀 만들기 버튼 */}
          <button
            onClick={handleMakeTeam}
            className="w-full h-[137px] bg-white border border-dashed border-[#BBBBBB] rounded-[10px] flex flex-col items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 bg-bg-01 rounded-full flex items-center justify-center">
              <Plus size={13} className="text-[#AAAAAA]" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[15px] font-semibold text-[#555555]">팀 만들기</span>
              <span className="text-xs text-[#888888]">
                직접 모집글을 작성해 팀원을 모집해보세요!
              </span>
            </div>
          </button>

          {/* 실제 내용 */}
          {renderTeamListBody()}
        </div>
      </div>

      {/* 팀 만들기 모달 */}
      <MakeTeamPopup open={isMakeTeamOpen} setOpen={setIsMakeTeamOpen} contestId={contestId} />

      {/* 팀 신청 모달 (팀 상세 + 신청) */}
      <RequestPopup open={isRequestOpen} setOpen={setIsRequestOpen} teamId={selectedTeamId} />

      {/* 로그인 필요 팝업 */}
      <LayerPopup open={isLoginPopupOpen} setOpen={setIsLoginPopupOpen}>
        <p className="text-center">팀을 만들기 위해서는 로그인이 필요합니다.</p>
        <div className="flex gap-2">
          <Button
            className="mt-4 w-1/2"
            variant="secondary"
            onClick={() => setIsLoginPopupOpen(false)}
          >
            취소
          </Button>
          <Button className="mt-4 w-1/2" variant="primary" onClick={() => router.push('/signup')}>
            확인
          </Button>
        </div>
      </LayerPopup>
    </>
  );
}
