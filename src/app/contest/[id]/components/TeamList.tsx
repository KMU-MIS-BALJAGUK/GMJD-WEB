'use client';

import { useState } from 'react';
import { Team } from '@/types/contest';
import TeamCard from './TeamCard';
import MakeTeamPopup from '@/components/popup/contest-detail/MakeTeamPopup';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface TeamListProps {
  teams: Team[];
  contestId: number;
}

export default function TeamList({ teams, contestId }: TeamListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 3;
  
  const totalPages = Math.ceil(teams.length / teamsPerPage);
  const startIndex = (currentPage - 1) * teamsPerPage;
  const currentTeams = teams.slice(startIndex, startIndex + teamsPerPage);

  return (
    <>
      <div className="w-full bg-[#F7F7F7] border-b border-[#E7E7E7] p-10 rounded-b-lg">
        {/* 상단: 제목 + 페이지네이션 */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-[#1D1D1D]">
            팀원 모집
          </h2>
          
          {/* 페이지네이션 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft size={24} className="text-[#555555]" />
            </button>
            <span className="text-sm text-[#1D1D1D] min-w-[40px] text-center">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight size={24} className="text-[#555555]" />
            </button>
          </div>
        </div>

        {/* 팀 카드 목록 (1열) */}
        <div className="flex flex-col gap-3">
          {/* 팀 만들기 버튼 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-[137px] bg-white border border-dashed border-[#BBBBBB] rounded-[10px] flex flex-col items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors"
          >
            <div className="w-6 h-6 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <Plus size={13} className="text-[#AAAAAA]" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[15px] font-semibold text-[#555555]">
                팀 만들기
              </span>
              <span className="text-xs text-[#888888]">
                직접 모집글을 작성해 팀원을 모집해보세요!
              </span>
            </div>
          </button>

          {/* 팀 카드들 */}
          {currentTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      {/* 팀 만들기 모달 */}
      <MakeTeamPopup
        open={isModalOpen}
        setOpen={setIsModalOpen}
        contestId={contestId}
      />
    </>
  );
}