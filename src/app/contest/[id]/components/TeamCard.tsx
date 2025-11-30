'use client';

import { useState } from 'react';
import { Team } from '@/features/contest/types/contest-mock';
import RequestPopup from '@/components/popup/contest-detail/RequestPopup';
import { UsersRound } from 'lucide-react';
import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useShallow } from 'zustand/react/shallow';

interface TeamCardProps {
  team: Team;
  onDetailView: () => void;
}

export default function TeamCard({ team, onDetailView }: TeamCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // useRouter 훅 사용

  // useAuthStore에서 accessToken 상태를 useShallow를 이용해 가져옵니다.
  const accessToken = useAuthStore(useShallow((state) => state.accessToken));
  const isLoggedIn = !!accessToken;

  // 참여 신청 버튼 클릭 핸들러
  const handleApplyClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      router.push('/signup');
      return;
    }

    // 로그인 상태일 경우: 원래 로직대로 모달 열기
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full bg-white border border-[#E7E7E7] rounded-[10px] p-6 flex flex-col gap-6">
        {/* 상단: 제목 + 태그 + 인원 (세로 배치) */}
        <div onClick={onDetailView} className="flex flex-col gap-4 cursor-pointer">
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
