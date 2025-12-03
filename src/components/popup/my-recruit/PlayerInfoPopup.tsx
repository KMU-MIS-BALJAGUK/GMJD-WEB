import React from 'react';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Tag from '../../common/Tag';
import Button from '../../common/Button';
import Image from 'next/image';
import { useRecruitApplicantDetail } from '@/hooks/team/useRecruitApplicantDetail';

type QuestionAnswer = { q: string; answer: string };

export interface ApplicantDetail {
  userId?: number;
  profileImageUrl?: string;
  name: string;
  summary: string[];
  level: number;
  skills: string[];
  question: QuestionAnswer[];
}

interface PlayerInfoPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  applicant?: ApplicantDetail;
  teamId?: number | null;
  applicantUserId?: number | null;
}

const fallbackData: ApplicantDetail = {
  name: '지원자',
  summary: [],
  level: 0,
  skills: [],
  question: [],
};

const PlayerInfoPopup = ({ open, setOpen, applicant, teamId, applicantUserId }: PlayerInfoPopupProps) => {
  const { data: fetchedDetail, isLoading, isError } = useRecruitApplicantDetail(
    open ? teamId ?? null : null,
    open ? applicantUserId ?? null : null,
  );

  const data = fetchedDetail
    ? {
        userId: fetchedDetail.userId,
        profileImageUrl: fetchedDetail.profileImageUrl,
        name: fetchedDetail.name,
        summary: fetchedDetail.aiTags,
        level: fetchedDetail.level,
        skills: fetchedDetail.skills,
        question:
          fetchedDetail.qaList?.map((item) => ({ q: item.question, answer: item.answer })) ??
          fallbackData.question,
      }
    : applicant ?? fallbackData;

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="지원자 정보">
      <div className="px-2">
        <div className="flex items-center gap-3 border-b pb-5">
          <Image
            src={data.profileImageUrl || '/profile-image.png'}
            alt="Profile Image"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />

          <div className="gap-1.5 flex flex-col">
            <div className="flex items-end">
              <p>{data.name}</p>
              <Tag variant="blue" className="ml-2 text-xs">
                추천LV.{data.level}
              </Tag>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {data.summary.map((item, index) => (
                <p key={index} className="text-[14px] text-text-03">
                  #{item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-5">
          <p>스킬셋</p>

          <div>
            {data.skills.map((skill, index) => (
              <Tag key={index} variant="default" className="mr-2 mb-2">
                {skill}
              </Tag>
            ))}
            {data.skills.length === 0 && <p className="text-text-03 text-sm">등록된 스킬이 없습니다.</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-5">
          <p>답변</p>

          {isLoading && <p className="text-text-03 text-sm mb-2">불러오는 중...</p>}
          {isError && <p className="text-text-03 text-sm mb-2">불러오기에 실패했습니다.</p>}

          {data.question.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="text-[13px] text-text-03 mb-1">
                질문{index + 1}. {item.q}
              </p>
              <p className="text-[15px] text-text-01">{item.answer}</p>
            </div>
          ))}
          {data.question.length === 0 && !isLoading && !isError && (
            <p className="text-text-03 text-sm">등록된 답변이 없습니다.</p>
          )}
        </div>

        <div className="flex gap-2 pt-5">
          <Button onClick={() => setOpen(false)} className="w-1/2" variant="red">
            거절
          </Button>
          <Button onClick={() => setOpen(false)} className="w-1/2" variant="primary">
            수락
          </Button>
        </div>
      </div>
    </LayerPopup>
  );
};

export default PlayerInfoPopup;
