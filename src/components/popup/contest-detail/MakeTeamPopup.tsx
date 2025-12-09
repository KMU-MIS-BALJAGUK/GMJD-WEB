import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import { CircleMinus, CirclePlus, CircleX } from 'lucide-react';
import Input from '../../common/Input';
import LayerPopup from '../../common/layerpopup/LayerPopup';
import { useMutation } from '@tanstack/react-query';
import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
import type { TeamCreateResponseDto } from '@/features/team/types/TeamCreateResponse';
import { useQueryClient } from '@tanstack/react-query';

// 팀 생성 API
import { createTeam } from '@/lib/api/team/team';
// 토스트 훅
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

// AI 추천 질문 API
import { useAiQuestionRecommend } from '@/hooks/team/useAiQuestionRecommend';

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
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 1. 상태 관리
  const [title, setTitle] = useState<string>('');
  const [recruitNumber, setRecruitNumber] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [question, setQuestion] = useState<string[]>([]);
  const [questionInput, setQuestionInput] = useState<string>('');
  // questionSuggestions 상태 제거

  // AI 추천 질문 useQuery 훅 (팝업 열릴 때 자동 호출)
  const { data: aiQuestions, isLoading: isAiLoading } = useAiQuestionRecommend(contestId);

  // useEffect 제거
  
  // 팀 생성 mutation
  const { mutate: createTeamMutate, isPending } = useMutation<
    TeamCreateResponseDto,
    Error,
    TeamCreateRequestDto
  >({
    mutationFn: (body) => createTeam(contestId, body),
    onSuccess: async () => {
      // 팀 생성 후 관련 쿼리들 무효화
      await queryClient.invalidateQueries({
        queryKey: ['contestTeams', contestId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['myTeams'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['myRecruitTeams'],
      });
      reset();
      setOpen(false);
      toast({
        variant: 'default',
        title: '팀이 생성되었어요 ✅',
        description: '팀원 모집 글이 등록되었습니다.',
      });
    },
    onError: (error) => {
      console.error('팀 생성 실패:', error);
      setOpen(false);
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.code;
        if (errorCode === 40009) {
          toast({
            variant: 'destructive',
            title: '팀 생성에 실패했어요 🥲',
            description: '해당 공모전에 이미 모집 중인 팀이 존재합니다.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: '팀 생성에 실패했어요 🥲',
            description: '잠시 후 다시 시도해주세요.',
          });
        }
      }
    },
  });

  // 4. 헬퍼 함수들
  // handleGetAiQuestions 함수 제거됨

  const addQuestion = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuestion((prev) => {
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
    // setQuestionSuggestions(DEFAULT_AI_QUESTIONS); // 리셋 시 기본 질문으로 (삭제)
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

  // 화면에 표시할 AI 질문 목록 (aiQuestions 데이터 또는 기본 질문)
  const suggestionsToShow = (aiQuestions && aiQuestions.length > 0) ? aiQuestions : DEFAULT_AI_QUESTIONS;

  // 5. 렌더링
  return (
    <LayerPopup open={open} setOpen={handleOpenChange} title="팀 만들기">
      <div>
        <div className="flex flex-col gap-5 px-2 h-[500px] overflow-y-auto scrollbar">
          {/* ... (title, recruitNumber, content inputs) ... */}
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
          <div className="flex flex-col gap-1">
            <p>
              모집 글<span className="text-red-500 ml-[1px]">*</span>
            </p>
            <Input
              placeholder="내용을 입력하세요. ex) 팀 소개, 모집 역할, 필요 스킬"
              variant="textArea"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
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

          {/* AI 추천 질문 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p>💬 AI 추천 질문 리스트</p>
              {isAiLoading ? (
                <p className="text-text-03 text-sm">불러오는 중...</p>
              ) : (
                null // 또는 빈 Fragment
              )}
            </div>
            {suggestionsToShow.map((q, index) => (
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

