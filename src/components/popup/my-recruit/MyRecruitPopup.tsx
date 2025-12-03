import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, UsersRound } from 'lucide-react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Tag from '../../common/Tag';
import Button from '../../common/Button';
import PlayerInfoPopup, { ApplicantDetail } from './PlayerInfoPopup';
import { useRecruitApplicants } from '@/hooks/team/useRecruitApplicants';

type ApplicantSummary = {
  userId: number;
  name: string;
  summary: string[];
  profileImageUrl?: string;
  detail?: ApplicantDetail;
};

interface MyRecruitPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  status?: 'open' | 'closed';
  recruitMember?: number;
  applyNumber?: number;
  applicants?: ApplicantSummary[];
  teamId?: number | null;
}

const fallbackData = {
  title: 'NH농협카드 플레이&스티커 디자인 콘테스트',
  status: 'open' as const,
  recruitMember: 2,
  applyNumber: 4,
};

const MyRecruitPopup = ({
  open,
  setOpen,
  title,
  status,
  recruitMember,
  applyNumber,
  applicants,
  teamId,
}: MyRecruitPopupProps) => {
  const [applicantPopupOpen, setApplicantPopupOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantSummary | undefined>(undefined);

  const { data: fetchedApplicants, isLoading: isApplicantsLoading } = useRecruitApplicants(
    open ? teamId ?? null : null,
  );

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setApplicantPopupOpen(false);
    }
  };

  const resolvedApplicants: ApplicantSummary[] = useMemo(() => {
    if (applicants && applicants.length > 0) return applicants;
    if (fetchedApplicants && fetchedApplicants.length > 0) {
      return fetchedApplicants.map((item) => ({
        userId: item.userId,
        name: item.name,
        summary: item.aiTags,
        profileImageUrl: item.profileImageUrl,
        detail: {
          userId: item.userId,
          profileImageUrl: item.profileImageUrl,
          name: item.name,
          summary: item.aiTags,
          level: 0,
          skills: [],
          question: [],
        },
      }));
    }
    return [];
  }, [applicants, fetchedApplicants]);

  const handleApplicantClick = (applicant: ApplicantSummary) => {
    setSelectedApplicant(applicant);
    setApplicantPopupOpen(true);
  };

  const resolvedData = {
    title: title ?? fallbackData.title,
    status: status ?? fallbackData.status,
    recruitMember: recruitMember ?? fallbackData.recruitMember,
    applyNumber: applyNumber ?? fallbackData.applyNumber,
    applyPlayers: resolvedApplicants,
  };

  return (
    <>
      <LayerPopup open={open} setOpen={handleOpenChange} title="팀 정보">
        <div>
          <div className="flex flex-col px-2 h-auto pb-1 max-h-[600px] overflow-y-auto scrollbar">
            <div className="flex flex-col gap-3 pb-5 border-b">
              <div>
                <Tag
                  variant={resolvedData.status === 'open' ? 'green' : 'gray'}
                  shape="square"
                  className="mb-2"
                >
                  {resolvedData.status === 'open' ? '모집중' : '모집완료'}
                </Tag>
                <p className="text-text-01 font-semibold text-xl mb-1">{resolvedData.title}</p>
              </div>

              <p className="flex gap-1 items-center text-text-02 text-[14px]">
                <UsersRound size={16} />
                모집 인원 {resolvedData.recruitMember}명 /{' '}
                <span className="text-blue">지원 {resolvedData.applyNumber}명</span>
              </p>
            </div>

            <div className="flex flex-col gap-5 pt-5 text-text-01">
              <div className="flex flex-col gap-4 text-[14px]">
                <p className="text-base">지원자 리스트</p>

                {isApplicantsLoading && <p className="text-text-03 text-sm">불러오는 중...</p>}

                {!isApplicantsLoading && resolvedData.applyPlayers.length === 0 && (
                  <p className="text-text-03 text-sm">지원자가 없습니다.</p>
                )}

                {resolvedData.applyPlayers.map((player, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full bg-amber-300 shrink-0 overflow-hidden">
                        <Image
                          src={player.profileImageUrl || '/profile-image.png'}
                          alt={`${player.name} 프로필`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex max-sm:flex-col sm:gap-1.5">
                          <p>{player.name}</p>
                          <p className="text-text-04">
                            {player.summary.map((item) => `#${item}`).join('\u00A0\u00A0')}
                          </p>
                        </div>

                        <button
                          className="p-1 cursor-pointer"
                          onClick={() => handleApplicantClick(player)}
                          aria-label={`${player.name} 지원자 정보 보기`}
                        >
                          <ChevronRight size={20} className="text-text-03 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5">
            <Button onClick={() => setOpen(false)} className="w-full" variant="primary">
              확인
            </Button>
          </div>
        </div>
      </LayerPopup>

      <PlayerInfoPopup
        open={applicantPopupOpen}
        setOpen={setApplicantPopupOpen}
        applicant={selectedApplicant?.detail}
        teamId={teamId ?? null}
        applicantUserId={selectedApplicant?.userId ?? null}
      />
    </>
  );
};

export default MyRecruitPopup;
