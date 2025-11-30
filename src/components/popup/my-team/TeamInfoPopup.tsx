'use client';

import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import { Crown, PenLine, UsersRound } from 'lucide-react';
import Input from '../../common/Input';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import { useTeamDetail } from '@/hooks/team/useTeamDetail';
import { useUpdateTeamMemo } from '@/hooks/team/useUpdateTeamMemo';
import RemovePlayerPopup from './RemovePlayerPopup'; // 내보내기 팝업

const TeamInfoPopup = ({
  open,
  setOpen,
  teamId,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  teamId: number | null;
}) => {
  // API Hooks
  const { data, isLoading, isError } = useTeamDetail(teamId);
  const { mutate: updateMemo, isPending: isUpdatingMemo } = useUpdateTeamMemo();

  // State
  const [memo, setMemo] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isKickPopupOpen, setIsKickPopupOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{ id: number; name: string } | null>(null);

  // 데이터 로드 시 메모 상태 초기화
  useEffect(() => {
    if (data?.memo) {
      setMemo(data.memo);
    }
  }, [data]);

  const reset = () => {
    setIsEditing(false);
    if (data?.memo) setMemo(data.memo);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) reset();
    setOpen(value);
  };

  const handleSave = () => {
    if (!teamId) return;
    updateMemo(
      { teamId, data: { memo } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  // TODO: API 응답에 'isLeader'와 멤버별 'isMe' 정보가 필요합니다.
  // const handleOpenKickPopup = (player: { id: number; name: string }) => {
  //   setSelectedPlayer(player);
  //   setIsKickPopupOpen(true);
  // };

  if (isLoading) return <LayerPopup open={open} setOpen={setOpen} title="팀 정보"><p>로딩 중...</p></LayerPopup>;
  if (isError || !data) return <LayerPopup open={open} setOpen={setOpen} title="팀 정보"><p>오류가 발생했습니다.</p></LayerPopup>;

  return (
    <>
      <LayerPopup open={open} setOpen={handleOpenChange} title="팀 정보">
        <div>
          <div className="flex flex-col px-2 h-auto pb-1 max-h-[600px] overflow-y-auto scrollbar">
            <div className="flex flex-col gap-3 pb-5 border-b">
              <div>
                <p className="text-text-01 font-semibold text-xl mb-1">{data.title}</p>
                {/* 'contestOrganizationName' 필드가 API 응답에 없어 제거되었습니다. */}
              </div>

              <div className="flex justify-between h-9 items-end">
                <p className="flex gap-1 items-center text-text-02 text-[14px]">
                  <UsersRound size={16} />
                  인원 {data.memberCount}/{data.maxMember}명
                </p>

                {!isEditing && (
                  <Button
                    variant="ghost"
                    className="px-2 h-9 text-text-02 flex gap-1"
                    onClick={() => setIsEditing((prev) => !prev)}
                  >
                    <PenLine size={15} />
                    수정
                  </Button>
                )}
              </div>
            </div>

            {/* 메모 */}
            <div className="flex flex-col gap-5 pt-5 text-text-01">
              <div className="flex flex-col gap-1">
                <p>메모</p>
                <Input
                  placeholder={isEditing ? '메모를 자유롭게 작성해주세요.' : '작성된 메모가 없습니다.'}
                  value={memo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemo(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex flex-col gap-4 text-[14px]">
                <p className="text-base">팀원 관리</p>

                {(data?.members ?? []).map((player) => (
                  <div key={player.memberId}>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full bg-amber-300 shrink-0">
                        {/* TODO: API 응답에 player.role 정보가 필요합니다. */}
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex gap-1.5">
                          <p>{player.name}</p>
                           {/* TODO: API 응답에 player.isMe 정보가 필요합니다. */}
                        </div>
                        
                        {/* TODO: API 응답에 isLeader, player.isMe 정보가 없어 내보내기 버튼을 비활성화합니다. */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="pt-5 flex gap-3">
            {isEditing ? (
              <Button onClick={handleSave} className="w-full" variant="primary" disabled={isUpdatingMemo}>
                {isUpdatingMemo ? '저장 중...' : '수정 완료'}
              </Button>
            ) : (
              <>
                <Button
                  className="w-full"
                  variant="secondary"
                  disabled={true} // 'contestUrl' 정보가 API에 없어 비활성화
                >
                  공모전 바로가기
                </Button>
                <Button
                  className="w-full"
                  variant="primary"
                  onClick={() => console.log('팀 채팅 이동')} // 'chatUrl' 정보가 API에 없어 console.log로 대체
                >
                  팀 채팅
                </Button>
              </>
            )}
          </div>
        </div>
      </LayerPopup>
      
      {/* 팀원 내보내기 팝업 */}
      {/* 로직 비활성화
      {selectedPlayer && (
        <RemovePlayerPopup
          open={isKickPopupOpen}
          setOpen={setIsKickPopupOpen}
          playerName={selectedPlayer.name}
          teamId={teamId}
          memberId={selectedPlayer.id}
        />
      )}
      */}
    </>
  );
};

export default TeamInfoPopup;
