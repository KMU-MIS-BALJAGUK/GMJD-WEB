'use client';

import { useState } from 'react';
import { Team } from '@/types/contest';
import Tag from '@/components/common/Tag';
import Button from '@/components/common/Button';
import ApplyTeamModal from './ApplyTeamModal';
import { Users } from 'lucide-react';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white rounded-2xl border-2 border-gray-200 p-6 flex flex-col gap-4 hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer group">
        {/* 제목 */}
        <h3 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors line-clamp-1">
          {team.teamName}
        </h3>

        {/* 태그들 */}
        <div className="flex flex-wrap gap-2">
          {team.tags.slice(0, 3).map((tag, index) => (
            <Tag
              key={index}
              variant="blue"
              shape="rounded"
              className="text-sm"
            >
              {tag}
            </Tag>
          ))}
        </div>

        {/* 모집 인원 */}
        <div className="flex items-center gap-2 text-gray-700">
          <Users size={18} />
          <span className="text-sm font-medium">
            {team.currentMembers}/{team.maxMembers}명
          </span>
        </div>

        {/* 신청 버튼 */}
        <Button
          variant={team.status === 'recruiting' ? 'primary' : 'disabled'}
          fullWidth
          disabled={team.status === 'closed'}
          onClick={() => setIsModalOpen(true)}
          className="h-11 text-sm font-semibold mt-2"
        >
          {team.status === 'recruiting' ? '팀 참여 신청하기' : '모집 완료'}
        </Button>
      </div>

      {/* 신청 모달 */}
      <ApplyTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        team={team}
      />
    </>
  );
}