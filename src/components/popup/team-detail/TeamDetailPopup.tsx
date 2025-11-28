'use client';

import { useState } from 'react';
import { useTeamDetail } from '@/hooks/team/useTeamDetail';
import { useUpdateTeamMemo } from '@/hooks/team/useUpdateTeamMemo';
import { useKickTeamMember } from '@/hooks/team/useKickTeamMember';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Button from '@/components/common/Button';

interface TeamDetailPopupProps {
  teamId: number | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function TeamDetailPopup({ teamId, open, setOpen }: TeamDetailPopupProps) {
  const { data: team, isLoading, isError } = useTeamDetail(teamId);
  const { mutate: updateMemo, isPending: isUpdatingMemo } = useUpdateTeamMemo();
  const { mutate: kickMember, isPending: isKickingMember } = useKickTeamMember();

  const [memo, setMemo] = useState('');

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
  
  // This is a placeholder. The actual member kick would need the member's ID.
  // The TeamDetailDto needs to be updated to include a list of members.
  const handleKickMember = (memberId: number) => {
    if (teamId) {
      kickMember({ teamId, memberId });
    }
  };

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
                          <textarea
                            className="w-full p-2 border rounded"
                            defaultValue={team.memo ?? ''}
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
                                <Button 
                                  onClick={() => handleKickMember(member.memberId)} 
                                  variant="red"
                                  disabled={isKickingMember}
                                >
                                  내보내기
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}