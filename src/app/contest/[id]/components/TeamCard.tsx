'use client';

import { useState } from 'react';
import { Team } from '@/types/contest';
import RequestPopup from '@/components/popup/contest-detail/RequestPopup';
import { UsersRound } from 'lucide-react';
import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white border border-[#E7E7E7] rounded-[10px] p-6 flex flex-col gap-6">
        {/* 상단: 제목 + 태그 + 인원 (세로 배치) */}
        <div className="flex flex-col gap-4">
          {/* 제목 */}
          <h3 className="text-[17px] font-semibold text-[#1D1D1D]">{team.teamName}</h3>

          {/* 태그들 (가로 배치) */}
          <div className="flex items-center gap-1 flex-wrap">
            {team.tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} variant="blue" shape="square">
                #{tag}
              </Tag>
            ))}
          </div>

          {/* 모집인원 */}
          <div className="flex items-center gap-1 text-[13px] font-medium text-[#555555]">
            <UsersRound size={16} />
            <span className="whitespace-nowrap">
              모집인원 : {team.currentMembers}/{team.maxMembers}명
            </span>
          </div>
        </div>

        {/* 신청 버튼 - 텍스트 수정 */}
        <Button onClick={() => setIsModalOpen(true)} disabled={team.status === 'closed'}>
          {team.status === 'recruiting' ? '참여 신청하기' : '모집 완료'}
        </Button>
      </div>

      {/* 신청 모달 */}
      <RequestPopup open={isModalOpen} setOpen={setIsModalOpen} team={team} />
    </>
  );
}
