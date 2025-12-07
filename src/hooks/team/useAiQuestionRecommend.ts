// src/hooks/team/useAiQuestionRecommend.ts
// AI 추천 질문을 받아오는 뮤테이션 훅

import { useMutation } from '@tanstack/react-query';
import { fetchAiQuestions } from '@/lib/api/team/team';

export function useAiQuestionRecommend() {
  return useMutation<string[], Error, { contestId: number }>({
    mutationFn: ({ contestId }) => fetchAiQuestions(contestId),
  });
}
