'use client';

import { useState } from 'react';
import { Team } from '@/types/contest';
import TeamCard from './TeamCard';
import Button from '@/components/common/Button';
import CreateTeamModal from './CreateTeamModal';
import { Plus } from 'lucide-react';

interface TeamListProps {
  teams: Team[];
  contestId: number;
}

export default function TeamList({ teams, contestId }: TeamListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        {/* 상단: 제목 + 팀 만들기 버튼 */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-black">
            참여 팀 <span className="text-blue-600">({teams.length})</span>
          </h2>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="h-10 px-6 text-sm font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            팀 만들기
          </Button>
        </div>

        {/* 팀 카드 그리드 (2열) */}
        {teams.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-gray-700">
                아직 생성된 팀이 없습니다
              </p>
              <p className="text-sm text-gray-500">
                첫 번째 팀을 만들어보세요!
              </p>
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                className="mt-4"
              >
                <Plus size={18} className="mr-2" />
                팀 만들기
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 팀 만들기 모달 */}
      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contestId={contestId}
      />
    </>
  );
}