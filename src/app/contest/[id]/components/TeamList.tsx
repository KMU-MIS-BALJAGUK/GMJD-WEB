'use client';

import { useState } from 'react';
import { Team } from '@/features/contest/types/contest-mock';
import TeamCard from './TeamCard';
import MakeTeamPopup from '@/components/popup/contest-detail/MakeTeamPopup';
import TeamDetailPopup from '@/components/popup/team-detail/TeamDetailPopup'; // Import the new popup
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface TeamListProps {
  teams: Team[];
  contestId: number;
}

export default function TeamList({ teams, contestId }: TeamListProps) {
  const [isMakeTeamModalOpen, setIsMakeTeamModalOpen] = useState(false);
  const [detailTeamId, setDetailTeamId] = useState<number | null>(null); // State for detail view
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 3;

  const totalPages = Math.ceil(teams.length / teamsPerPage);
  const startIndex = (currentPage - 1) * teamsPerPage;
  const currentTeams = teams.slice(startIndex, startIndex + teamsPerPage);

  return (
    <>
      <div className="w-full bg-bg-02 border-b border-border-01 p-4 py-10 rounded-b-lg">
        {/* 상단: 제목 + 페이지네이션 */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-text-01">팀원 모집</h2>

          {/* 페이지네이션 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft size={24} className="text-[#555555] cursor-pointer" />
            </button>
            <span className="text-sm text-text-01 min-w-[40px] text-center">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight size={24} className="text-[#555555] cursor-pointer" />
            </button>
          </div>
        </div>

        {/* 팀 카드 목록 (1열) */}
        <div className="flex flex-col gap-3">
          {/* 팀 만들기 버튼 */}
          <button
            onClick={() => setIsMakeTeamModalOpen(true)}
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

          {/* 팀 카드들 */}
          {currentTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onDetailView={() => setDetailTeamId(team.id)}
            />
          ))}
        </div>
      </div>

      {/* 팀 만들기 모달 */}
      <MakeTeamPopup open={isMakeTeamModalOpen} setOpen={setIsMakeTeamModalOpen} contestId={contestId} />
      
      {/* 팀 상세 정보 모달 */}
      <TeamDetailPopup 
        teamId={detailTeamId} 
        open={!!detailTeamId} 
        setOpen={() => setDetailTeamId(null)} 
      />
    </>
  );
}
