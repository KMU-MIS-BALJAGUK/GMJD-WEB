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
import { useRecruitApplicants } from '@/hooks/team/useRecruitApplicants';

const TeamInfoPopup = ({
  open,
  setOpen,
  teamId,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  teamId: number | null;
}) => {
  const { data, isLoading, isError } = useTeamDetail(teamId);
  const { data: userProfile } = useUserProfile();
  const { mutate: updateMemo, isPending: isUpdatingMemo } = useUpdateTeamMemo();
  const { data: applicants, isLoading: isApplicantsLoading } = useRecruitApplicants(teamId ?? null);

  const [memo, setMemo] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isKickPopupOpen, setIsKickPopupOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{ id: number; name: string } | null>(null);

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
      },
    );
  };

  const handleOpenKickPopup = (player: { id: number; name: string }) => {
    setSelectedPlayer(player);
    setIsKickPopupOpen(true);
  };

  if (isLoading) return <LayerPopup open={open} setOpen={setOpen} title="팀 정보"><p>로딩 중...</p></LayerPopup>;
  if (isError || !data) return <LayerPopup open={open} setOpen={setOpen} title="팀 정보"><p>오류가 발생했습니다.</p></LayerPopup>;

  const isLeader = userProfile?.name === data.leaderName;

  return (
    <>
      <LayerPopup open={open} setOpen={handleOpenChange} title="팀 정보">
        <div>
          <div className="flex flex-col px-2 h-auto pb-1 max-h-[600px] overflow-y-auto scrollbar">
            <div className="flex flex-col gap-3 pb-5 border-b">
              <div>
                <p className="text-text-01 font-semibold text-xl mb-1">{data.title}</p>
              </div>

              <div className="flex justify-between h-9 items-end">
                <p className="flex gap-1 items-center text-text-02 text-[14px]">
                  <UsersRound size={16} />
                  인원 {data.memberCount}/{data.maxMember}명
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

              {/* 팀원 관리 */}
              <div className="flex flex-col gap-4 text-[14px]">
                <p className="text-base">팀원 관리</p>

                {(data?.members ?? []).map((player) => {
                  const playerRole = player.name === data.leaderName ? '팀장' : '팀원';
                  return (
                    <div key={player.memberId}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full bg-amber-300 shrink-0">
                          {playerRole === '팀장' && (
                            <div className="p-[1px] bg-blue absolute right-0 bottom-0 rounded-full">
                              <Crown size={11} className="fill-white text-blue" />
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between w-full">
                          <div className="flex gap-1.5">
                            <p>{player.name}</p>
                            <p className="text-text-04">
                              {playerRole} {userProfile?.name === player.name ? '/ 나' : ''}
                            </p>
                          </div>

                          {isEditing && isLeader && player.name !== data.leaderName && (
                            <button
                              className="text-blue cursor-pointer"
                              onClick={() => handleOpenKickPopup({ id: player.memberId, name: player.name })}
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

              {/* 지원자 목록 */}
              <div className="flex flex-col gap-4 text-[14px]">
                <p className="text-base">지원자</p>
                {isApplicantsLoading && <p className="text-text-03 text-sm">불러오는 중...</p>}
                {!isApplicantsLoading && (applicants?.length ?? 0) === 0 && (
                  <p className="text-text-03 text-sm">지원자가 없습니다.</p>
                )}
                {!isApplicantsLoading &&
                  applicants?.map((applicant) => (
                    <div key={applicant.userId}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                          <Image
                            src={applicant.profileImageUrl || '/profile-image.png'}
                            alt={`${applicant.name} 프로필`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex justify-between w-full">
                          <div className="flex flex-col">
                            <p className="font-medium">{applicant.name}</p>
                            <p className="text-text-04 text-sm">
                              {applicant.aiTags.map((tag) => `#${tag}`).join(' ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="pt-5 flex gap-3">
            {isEditing && isLeader ? (
              <Button onClick={handleSave} className="w-full" variant="primary" disabled={isUpdatingMemo}>
                {isUpdatingMemo ? '저장 중...' : '수정 완료'}
              </Button>
            ) : (
              <>
                <Button className="w-full" variant="secondary" disabled>
                  홈페이지 지원
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
          memberId={selectedPlayer.id}
        />
      )}
    </>
  );
};

export default TeamInfoPopup;
