'use client';

import { useState, useEffect } from 'react';
import { useTeamDetail } from '@/hooks/team/useTeamDetail';
import { useUpdateTeamMemo } from '@/hooks/team/useUpdateTeamMemo';
import { useKickTeamMember } from '@/hooks/team/useKickTeamMember';
import { useUserProfile } from '@/hooks/mypage/useUserProfile'; // 현재 사용자 정보
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Button from '@/components/common/Button';

interface TeamDetailPopupProps {
  teamId: number | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function TeamDetailPopup({ teamId, open, setOpen }: TeamDetailPopupProps) {
  const { data: team, isLoading, isError } = useTeamDetail(teamId);
  const { data: userProfile } = useUserProfile(); // 현재 사용자 프로필
  const { mutate: updateMemo, isPending: isUpdatingMemo } = useUpdateTeamMemo();
  const { mutate: kickMember, isPending: isKickingMember } = useKickTeamMember();

  const [memo, setMemo] = useState('');

  // [FIX] 데이터 로드 시 메모 상태 동기화
  useEffect(() => {
    if (team?.memo) {
      setMemo(team.memo);
    }
  }, [team?.memo]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
    }
  };

  const handleSaveMemo = () => {
    if (teamId) {
      updateMemo({ teamId, data: { memo } });
    }
  };

  const handleKickMember = (memberId: number) => {
    if (teamId) {
      kickMember({ teamId, memberId });
    }
  };
  
  // [FIX] 현재 사용자가 리더인지 확인
  // TODO: API에 isLeader:boolean 필드를 추가하는 것이 더 이상적입니다.
  const isLeader = userProfile?.name === team?.leaderName;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>팀 상세 정보</DialogTitle>
        </DialogHeader>

        {isLoading && <p>로딩 중...</p>}
        {isError && <p>팀 정보를 불러오는 데 실패했습니다.</p>}
        
        {team && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold">{team.title}</h2>
              <p className="text-sm text-gray-500 mt-1">리더: {team.leaderName} | 멤버: {team.memberCount}/{team.maxMember}</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">소개</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{team.introduction}</p>
            </div>

            <div className="border-t pt-4">
              {/* [FIX] defaultValue -> value 로 변경 */}
              <textarea
                className="w-full p-2 border rounded"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                rows={4}
              />
              <Button onClick={handleSaveMemo} disabled={isUpdatingMemo} className="mt-2">
                {isUpdatingMemo ? '저장 중...' : '메모 저장'}
              </Button>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">팀원 목록</h3>
              <div className="flex flex-col gap-2">
                {team.members?.map((member) => (
                  <div key={member.memberId} className="flex justify-between items-center p-2 border rounded">
                    <span>{member.name}</span>
                    {/* [FIX] 리더일 경우에만, 그리고 자기 자신이 아닐 경우에만 내보내기 버튼 표시 */}
                    {isLeader && member.name !== team.leaderName && (
                      <Button 
                        onClick={() => handleKickMember(member.memberId)} 
                        variant="red"
                        disabled={isKickingMember}
                      >
                        내보내기
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}