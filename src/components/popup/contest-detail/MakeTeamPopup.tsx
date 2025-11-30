import React, { useState } from 'react';
import Button from '../../common/Button';
import { CircleMinus, CirclePlus, CircleX } from 'lucide-react';
import Input from '../../common/Input';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import { useMutation } from '@tanstack/react-query';
import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
import type { TeamCreateResponseDto } from '@/features/team/types/TeamCreateResponse';

// 팀 생성 API
import { createTeam } from '@/lib/api/team/team';

//  AI 추천 질문 API는 아직 403이라 나중에 연동
// import { fetchAiQuestions } from '@/lib/api/team/team';

// 기본 AI 질문 (API 실패 / 미구현 시 fallback)
const DEFAULT_AI_QUESTIONS = [
  '해당 공모전에 지원한 동기가 무엇인가요?',
  '평소에 즐겨 사용하는 디자인 툴이나 개발 언어가 있나요?',
];

interface MakeTeamPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  contestId: number;
}

const MakeTeamPopup = ({ open, setOpen, contestId }: MakeTeamPopupProps) => {

  // 1. 상태 관리
  const [title, setTitle] = useState<string>('');
  const [recruitNumber, setRecruitNumber] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [question, setQuestion] = useState<string[]>([]);
  const [questionInput, setQuestionInput] = useState<string>('');

  // 지금은 API 안 쓰고 기본 질문만 사용
  const questionSuggestions = DEFAULT_AI_QUESTIONS;

  // 3. 팀 생성 mutation
  const {
    mutate: createTeamMutate,
    isPending,
  } = useMutation<TeamCreateResponseDto, Error, TeamCreateRequestDto>({
    mutationFn: (body) => createTeam(contestId, body),
    onSuccess: () => {
      // TODO: 팀 목록 refetch (React Query 쓰면 invalidateQueries 등)
      reset();
      setOpen(false);
    },
    onError: (error) => {
      console.error('팀 생성 실패:', error);
      // TODO: 에러 토스트 띄우기 등
    },
  });

  // 4. 헬퍼 함수들
  const addQuestion = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setQuestion((prev) => {
      // 중복 추가 방지
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed];
    });
  };

  const removeQuestion = (index: number) => {
    setQuestion((prev) => prev.filter((_, i) => i !== index));
  };

  const reset = () => {
    setTitle('');
    setRecruitNumber(1);
    setContent('');
    setQuestion([]);
    setQuestionInput('');
  };

  const checkValidation = () => {
    if (title.trim() === '' || content.trim() === '') return true;
    return false;
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset();
    }
    setOpen(value);
  };

  const handleSubmit = () => {
    if (!contestId) {
      console.error('contestId가 없습니다. 팀 생성이 불가능합니다.');
      return;
    }

    const payload: TeamCreateRequestDto = {
      title,
      maxMember: recruitNumber,
      introduction: content,
      questions: question,
    };

    createTeamMutate(payload);
  };

  // 5. 렌더링
  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="팀 만들기">
      <div>
        <div className="flex flex-col gap-5 px-2 h-[500px] overflow-y-auto scrollbar">
          {/* 제목 */}
          <div className="flex flex-col gap-1">
            <p>
              제목<span className="text-red-500 ml-[1px]">*</span>
            </p>
            <Input
              placeholder="팀 제목을 입력해주세요."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          {/* 모집 인원 */}
          <div className="flex flex-col gap-1">
            <p>
              모집 인원<span className="text-red-500 ml-[1px]">*</span>
            </p>
            <div className="flex items-center gap-1.5">
              <CircleMinus
                className="inline-block text-white fill-gray-600 cursor-pointer"
                size={20}
                onClick={() => setRecruitNumber((prev) => Math.max(1, prev - 1))}
              />
              <span className="px-4 py-2 rounded-[8px] bg-bg-02">{recruitNumber}</span>
              <CirclePlus
                className="inline-block text-white fill-gray-600 cursor-pointer"
                size={20}
                onClick={() => setRecruitNumber((prev) => prev + 1)}
              />
            </div>
          </div>

          {/* 모집 글 */}
          <div className="flex flex-col gap-1">
            <p>
              모집 글<span className="text-red-500 ml-[1px]">*</span>
            </p>
            <Input
              placeholder="내용을 입력하세요. ex) 팀 소개, 모집 역할, 필요 스킬"
              variant="textArea"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
            />
          </div>

          {/* 커스텀 질문 */}
          <div className="flex flex-col gap-1">
            <p>질문</p>
            <Input
              placeholder="신청자에게 할 질문을 작성해주세요."
              variant="default"
              icon={<p className="text-blue text-xs font-extrabold">추가</p>}
              value={questionInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setQuestionInput(e.target.value);
              }}
              onIconClick={() => {
                if (questionInput.trim() !== '') {
                  addQuestion(questionInput.trim());
                  setQuestionInput('');
                }
              }}
            />

            <div className="flex flex-col gap-1.5 mt-1">
              {question.map((q, index) => (
                <span key={index} className="flex items-center text-sm text-text-02">
                  <span className="font-semibold mr-1">Q{index + 1}.</span>
                  {q}
                  <CircleX
                    size={20}
                    className="ml-1 cursor-pointer fill-gray-400 text-white"
                    onClick={() => removeQuestion(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* AI 추천 질문 (현재는 DEFAULT만) */}
          <div className="flex flex-col gap-2">
            <p>💬 AI 추천 질문 리스트</p>
            {questionSuggestions.map((q, index) => (
              <span
                key={index}
                className="inline-flex items-center text-sm px-4 py-2 border border-blue rounded-3xl text-blue bg-white cursor-pointer hover:bg-bg-blue"
                onClick={() => addQuestion(q)}
              >
                Q. {q}
              </span>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="pt-5">
          <Button
            onClick={handleSubmit}
            className="w-full"
            variant={checkValidation() || isPending ? 'disabled' : 'primary'}
            disabled={checkValidation() || isPending}
          >
            {isPending ? '생성 중...' : '팀 만들기'}
          </Button>
        </div>
      </div>
    </LayerPopup>
  );
};

export default MakeTeamPopup;
