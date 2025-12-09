import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Tag from '../../common/Tag';
import Button from '../../common/Button';
import Image from 'next/image';
import { Loader, X } from 'lucide-react';
import { TeamMember } from '@/features/chat/type/chatMessage';
import { useRecruitApplicantDetail } from '@/hooks/team/useRecruitApplicantDetail';

type QuestionAnswer = { q: string; answer: string };

export interface ChatMemberDetail {
  userId?: number;
  profileImageUrl?: string;
  name: string;
  summary: string[];
  level: number;
  skills: string[];
  question: QuestionAnswer[];
}

interface ChatMemberInfoPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  member: TeamMember | null;
  teamId?: number | null;
}

const fallbackData: ChatMemberDetail = {
  name: '팀원',
  summary: [],
  level: 0,
  skills: [],
  question: [],
};

const ChatMemberInfoPopup = ({ open, setOpen, member, teamId }: ChatMemberInfoPopupProps) => {
  const {
    data: fetchedDetail,
    isLoading,
    isError,
    error,
  } = useRecruitApplicantDetail(open ? teamId ?? null : null, open ? member?.userId ?? null : null);

  const data = fetchedDetail
    ? {
        userId: fetchedDetail.userId,
        profileImageUrl: fetchedDetail.profileImageUrl,
        name: fetchedDetail.name,
        summary: fetchedDetail.aiTags,
        level: fetchedDetail.level,
        skills: fetchedDetail.skills,
        question:
          fetchedDetail.qaList?.map((item) => ({ q: item.question, answer: item.answer })) ?? [],
      }
    : member
    ? {
        userId: member.userId,
        profileImageUrl: member.userProfileUrl,
        name: member.userName,
        summary: [],
        level: 0,
        skills: [],
        question: [],
      }
    : fallbackData;

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  if (!member) return null;

  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="팀원 정보">
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
            <div className="flex items-center">
              <p>{data.name}</p>
              <Tag variant="blue" className="ml-2 text-xs">
                추천 LV.{data.level}
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
          <p>보유 스킬</p>

          <div>
            {data.skills.map((skill, index) => (
              <Tag key={index} variant="default" className="mr-2 mb-2">
                {skill}
              </Tag>
            ))}
            {data.skills.length === 0 && (
              <p className="text-text-03 text-sm">등록된 스킬이 없습니다.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5">
          <p>질문 / 답변</p>

          {isLoading && (
            <div className="flex items-center gap-1 text-text-03 text-sm">
              <Loader size={16} className="animate-spin" />
              <span>불러오는 중...</span>
            </div>
          )}
          {isError && (
            <div className="flex items-center gap-1 text-text-03 text-sm">
              <X size={16} />
              <span>불러오기에 실패했습니다.</span>
            </div>
          )}

          {data.question.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="text-[13px] font-bold text-text-03 mb-1">
                Q{index + 1}. {item.q}
              </p>
              <p className="text-[15px] text-text-01">{item.answer}</p>
            </div>
          ))}
          {data.question.length === 0 && !isLoading && !isError && (
            <p className="text-text-03 text-sm">등록된 질문이 없습니다.</p>
          )}
        </div>

        <div className="pt-5">
          <Button onClick={() => setOpen(false)} className="w-full" variant="primary">
            확인
          </Button>
        </div>
      </div>
    </LayerPopup>
  );
};

export default ChatMemberInfoPopup;
