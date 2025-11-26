'use client';


import { UsersRound } from 'lucide-react';
import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import type { ContestTeamItemDto } from '@/features/contest/types/ContestTeamListResponse';

interface TeamCardProps {
  team: ContestTeamItemDto;
  onClickApply: () => void;
}

export default function TeamCard({ team, onClickApply }: TeamCardProps) {
  const isOpen = team.status === 'OPEN';

  return (
    <div className="w-full bg-white border border-[#E7E7E7] rounded-[10px] p-6 flex flex-col gap-6">
      {/* 상단: 제목 + 인원 */}
      <div className="flex flex-col gap-3">
        {/* 제목 */}
        <h3 className="text-[17px] font-semibold text-[#1D1D1D]">{team.title}</h3>

        {/* 모집인원 */}
        <div className="flex items-center gap-1 text-[13px] font-medium text-[#555555]">
          <UsersRound size={16} />
          <span className="whitespace-nowrap">
            모집인원 : {team.currentMemberCount}/{team.maxMember}명
          </span>
        </div>
      </div>

      {/* 신청 버튼 */}
      <Button onClick={onClickApply} disabled={!isOpen}>
        {isOpen ? '참여 신청하기' : '모집 완료'}
      </Button>
    </div>
  );
}