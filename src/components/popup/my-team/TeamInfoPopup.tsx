'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../../common/Button';
import { Crown, PenLine, UsersRound } from 'lucide-react';
import Input from '../../common/Input';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import { useTeamDetail } from '@/hooks/team/useTeamDetail';
import { useUpdateTeamMemo } from '@/hooks/team/useUpdateTeamMemo';
import RemovePlayerPopup from './RemovePlayerPopup';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';
import { useRouter } from 'next/navigation';

const TeamInfoPopup = ({
  open,
  setOpen,
  teamId,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  teamId: number | null;
}) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useTeamDetail(teamId);
  const { data: userProfile } = useUserProfile();
  const { mutate: updateMemo, isPending: isUpdatingMemo } = useUpdateTeamMemo();

  const [memo, setMemo] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isKickPopupOpen, setIsKickPopupOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{ userId: number; name: string } | null>(null);

  useEffect(() => {
    if (data?.memo) {
      setMemo(data.memo);
    }
  }, [data?.memo]);

  const reset = () => {
    setIsEditing(false);
    if (data?.memo) {
      setMemo(data.memo);
    } else {
      setMemo('');
    }
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
          refetch();
        },
      },
    );
  };

  const handleOpenKickPopup = (player: { userId: number; name: string }) => {
    setSelectedPlayer(player);
    setIsKickPopupOpen(true);
  };

  const handleNavigateToContest = () => {
    if (data?.contestId) {
      router.push(`/contest/${data.contestId}`);
      setOpen(false);
    }
  };

  if (isLoading) return <LayerPopup open={open} setOpen={setOpen} title="팀 정보"><p>로딩 중...</p></LayerPopup>;
  if (isError || !data) return <LayerPopup open={open} setOpen={setOpen} title="팀 정보"><p>오류가 발생했습니다.</p></LayerPopup>;

  const isLeader = data.myMemberType === '팀장';

  return (
    <>
      <LayerPopup open={open} setOpen={handleOpenChange} title="팀 정보">
        <div>
          <div className="flex flex-col px-2 h-auto pb-1 max-h-[600px] overflow-y-auto scrollbar">
            <div className="flex flex-col gap-3 pb-5 border-b">
              <div>
                <p className="text-text-01 font-semibold text-xl mb-1">{data.teamTitle}</p>
                <p className="text-text-03 text-sm mt-1">{data.contestName}</p>
              </div>

              <div className="flex justify-between h-9 items-end">
                <p className="flex gap-1 items-center text-text-02 text-[14px]">
                  <UsersRound size={16} />
                  인원 {data.memberCount}명
                </p>

                {isLeader && !isEditing && (
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
                {(data?.members ?? []).map((player) => {
                  const isCurrentUser = userProfile?.name === player.name;
                  return (
                    <div key={player.userId}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                          <Image src={player.profileImageUrl || '/profile.png'} alt={player.name} fill className="object-cover" />
                          {player.memberType === '팀장' && (
                            <div className="p-[1px] bg-blue absolute right-0 bottom-0 rounded-full">
                              <Crown size={11} className="fill-white text-blue" />
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between w-full">
                          <div className="flex gap-1.5">
                            <p>{player.name}</p>
                            <p className="text-text-04">
                              {player.memberType === '팀장' ? '팀장' : '팀원'} {isCurrentUser ? '/ 나' : ''}
                            </p>
                          </div>
                          {isEditing && isLeader && !isCurrentUser && (
                            <button
                              className="text-blue cursor-pointer"
                              onClick={() => handleOpenKickPopup({ userId: player.userId, name: player.name })}
                            >
                              내보내기
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-5 flex gap-3">
            {isEditing && isLeader ? (
              <Button onClick={handleSave} className="w-full" variant="primary" disabled={isUpdatingMemo}>
                {isUpdatingMemo ? '저장 중...' : '수정 완료'}
              </Button>
            ) : (
              <>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={handleNavigateToContest}
                  disabled={!data.contestId}
                >
                  공모전 바로가기
                </Button>
                <Button className="w-full" variant="primary" onClick={() => console.log('팀 채팅 이동')}>
                  팀 채팅
                </Button>
              </>
            )}
          </div>
        </div>
      </LayerPopup>

      {selectedPlayer && (
        <RemovePlayerPopup
          open={isKickPopupOpen}
          setOpen={setIsKickPopupOpen}
          playerName={selectedPlayer.name}
          teamId={teamId}
          userId={selectedPlayer.userId}
        />
      )}
    </>
  );
};

export default TeamInfoPopup;