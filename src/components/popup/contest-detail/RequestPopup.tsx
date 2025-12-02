'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import Button from '../../common/Button';
import { CalendarDays, UsersRound, X } from 'lucide-react';
import Input from '../../common/Input';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import Tag from '../../common/Tag';

import { fetchTeamDetailPublic, applyTeam } from '@/lib/api/team/team';
import type { TeamApplyRequestDto } from '@/features/team/types/TeamApplyRequest';
import type { TeamDetailDto } from '@/features/team/types/TeamDetailResponse';
import { useToast } from '@/components/common/toast/ToastProvider';

interface RequestPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  /** 신청할 팀 ID (없으면 null) */
  teamId: number | null;
}

// // 신청 성공 시
// showToast({
//   type: 'success',
//   title: '팀 신청이 완료되었어요 ✅',
//   description: '팀장이 검토 후 연락을 드릴 거예요.',
// });

export default function RequestPopup({
  open,
  setOpen,
  teamId,
}: RequestPopupProps) {
  const { showToast } = useToast();
  // =========================
  // 1. 팀 상세 조회 (TeamDetailDto)
  // =========================
  const {
    data: team,
    isLoading: isTeamLoading,
    error: teamError,
  } = useQuery<TeamDetailDto>({
    queryKey: ['teamDetail', teamId],
    queryFn: () => {
      if (!teamId) {
        throw new Error('teamId가 없습니다.');
      }
      // 공개 팀 상세 조회 API 사용
      return fetchTeamDetailPublic(teamId);
    },
    enabled: !!teamId && open,
  });


  // =========================
  // 2. 화면에 쓸 기본 정보 (fallback 포함)
  // =========================
  const title = team?.title ?? '팀 이름 미정';
  const author = team?.leaderName ?? '팀장 미정';
  const date = team?.createdAt ?? '';
  const recruitNumber = team?.memberCount ?? 0;
  const totalNumber = team?.maxMember ?? 0;
  const recruitDeadline = team?.contestEndDate ?? '마감일 미정';
  const content =
    team?.introduction ?? '팀 소개가 아직 등록되지 않았습니다.';

  // 질문 리스트
  const questions =
    team?.questionList && team.questionList.length > 0
      ? team.questionList
      : [
          '해당 공모전에 지원한 동기가 무엇인가요?',
          '평소에 즐겨 사용하는 디자인 툴이나 개발 언어가 있나요?',
        ];

  // =========================
  // 3. 상태 관리
  // =========================
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);

  // 질문 개수/팝업 open이 바뀔 때 answer 배열 길이 맞춰주기
  useEffect(() => {
    setAnswers(Array(questions.length).fill(''));
  }, [questions.length, open]);

  // =========================
  // 4. 팀 신청 mutation
  // =========================
  const { mutate: applyTeamMutate, isPending: isApplyLoading } = useMutation({
    mutationFn: (body: TeamApplyRequestDto) => {
      if (!teamId) {
        throw new Error('teamId가 없습니다. 팀 신청이 불가능합니다.');
      }
      return applyTeam(teamId, body);
    },
    onSuccess: () => {
      reset();
      setOpen(false);
      showToast({
        title: '팀 신청이 완료되었어요 🎉',
        description: '팀장 승인 후 연락을 받게 됩니다.',
        type: 'success',
      });
    },
    onError: (error) => {
      console.error('팀 신청 실패:', error);
      showToast({
        title: '팀 신청에 실패했어요',
        description: '잠시 후 다시 시도해 주세요.',
        type: 'error',
      });
    },
  });

  // =========================
  // 5. 헬퍼 함수들
  // =========================
  const addSkills = (q: string) => {
    if (q.trim() !== '') {
      setSkills((prev) => [...prev, q]);
    }
  };

  const removeSkills = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const reset = () => {
    setSkills([]);
    setSkillInput('');
    setAnswers(Array(questions.length).fill(''));
  };

  const checkValidation = () => {
    if (!teamId) return true; // 팀 ID 없으면 신청 불가
    if (skills.length === 0) return true;
    if (answers.some((answer) => answer.trim() === '')) return true;
    return false;
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset();
    }
    setOpen(value);
  };

  const handleSubmit = () => {
    if (!teamId) {
      console.error('teamId가 없습니다. teamId props를 확인하세요.');
      return;
    }

    const payload: TeamApplyRequestDto = {
      answer: answers,
      skills,
    };

    applyTeamMutate(payload);
  };

  // =========================
  // 6. 렌더링
  // =========================
  const isFormDisabled =
    isTeamLoading || !!teamError || isApplyLoading || !teamId;

  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="신청하기">
      <div>
        <div className="flex flex-col px-2 h-auto pb-1 max-h-[600px] overflow-y-auto scrollbar">
          {/* 상단 정보 */}
          <div className="flex flex-col gap-5 pb-5 border-b">
            <div>
              <p className="text-text-01 font-semibold text-xl mb-1">
                {title}
              </p>
              <p className="text-text-03 text-[13px]">
                {author} {date && `${date} 작성`}
              </p>
            </div>

            <div className="text-text-02 text-[14px]">
              <p className="flex gap-1 items-center">
                <UsersRound size={16} />
                모집인원: {recruitNumber}/{totalNumber}명
              </p>
              <p className="flex gap-1 items-center">
                <CalendarDays size={16} />
                모집기간: {recruitDeadline}까지
              </p>
            </div>
          </div>

          {/* 팀 소개 */}
          <div className="py-10 border-b">
            {isTeamLoading ? (
              <p className="text-text-03 text-[14px]">팀 정보를 불러오는 중입니다...</p>
            ) : teamError ? (
              <p className="text-red-500 text-[14px]">
                팀 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.
              </p>
            ) : (
              <p className="text-text-01 text-[15px] whitespace-pre-line">
                {content}
              </p>
            )}
          </div>

          {/* 신청 폼 */}
          <div className="flex flex-col gap-5 pt-5 text-text-01">
            {/* 스킬셋 */}
            <div className="flex flex-col gap-1">
              <p>
                스킬셋<span className="text-red-500 ml-[1px]">*</span>
              </p>
              <Input
                placeholder="활용 가능한 기술을 작성해주세요."
                value={skillInput}
                icon={<p className="text-blue text-xs font-extrabold">추가</p>}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSkillInput(e.target.value);
                }}
                onIconClick={() => {
                  addSkills(skillInput);
                  setSkillInput('');
                }}
                disabled={isFormDisabled}
              />

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <Tag
                        icon={
                          <X
                            size={15}
                            className="text-text-04 cursor-pointer"
                            onClick={() => removeSkills(index)}
                          />
                        }
                      >
                        {skill}
                      </Tag>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 질문 & 답변 */}
            <div className="flex flex-col gap-4">
              {questions.map((q, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-[14px]">{`질문 ${index + 1}. ${q}`}</p>
                  <Input
                    placeholder="답변을 작성해주세요."
                    value={answers[index] ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAnswerChange(index, e.target.value)
                    }
                    disabled={isFormDisabled}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="pt-5">
          <Button
            onClick={handleSubmit}
            className="w-full"
            variant={checkValidation() || isApplyLoading ? 'disabled' : 'primary'}
            disabled={checkValidation() || isApplyLoading}
          >
            {isApplyLoading ? '신청 중...' : '신청하기'}
          </Button>
        </div>
      </div>
    </LayerPopup>
  );
}