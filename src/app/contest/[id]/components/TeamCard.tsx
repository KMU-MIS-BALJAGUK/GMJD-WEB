'use client';

import { UsersRound } from 'lucide-react';
import Button from '@/components/common/Button';
import type { ContestTeamItemDto } from '@/features/contest/types/ContestTeamListResponse';

import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import LayerPopup from '@/components/common/layerpopup/LayerPopup';

interface TeamCardProps {
  team: ContestTeamItemDto;
  onClickApply: () => void;
}

export default function TeamCard({ team, onClickApply }: TeamCardProps) {
  const router = useRouter();
  const { data: user } = useUserProfile();
  const isLoggedIn = !!user;
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const isOpen = team.status === 'OPEN';

  const handleProtectedApplyClick = () => {
    if (!isLoggedIn) {
      if (!isLoggedIn) {
        setIsLoginPopupOpen(true);
        return;
      }
    }

    // 로그인 상태일 경우: 부모 컴포넌트에서 받은 원래 신청 함수 호출
    onClickApply();
  };

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
      <Button onClick={handleProtectedApplyClick} disabled={!isOpen}>
        {isOpen ? '참여 신청하기' : '모집 완료'}
      </Button>

      {/* 로그인 필요 팝업 */}
      <LayerPopup open={isLoginPopupOpen} setOpen={setIsLoginPopupOpen}>
        <p className="text-center">팀에 참여하기 위해 로그인이 필요합니다.</p>
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
    </div>
  );
}
