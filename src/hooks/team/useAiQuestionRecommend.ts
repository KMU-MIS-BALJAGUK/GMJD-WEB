// src/hooks/team/useAiQuestionRecommend.ts
// AI 추천 질문을 받아오는 뮤테이션 훅

import { useQuery } from '@tanstack/react-query';
import { fetchAiQuestions } from '@/lib/api/team/team';

export function useAiQuestionRecommend(contestId: number | null) {
  return useQuery<string[], Error>({
    queryKey: ['aiQuestions', contestId], // 쿼리 키에 contestId 포함
    queryFn: () => fetchAiQuestions(contestId!), // contestId가 유효할 때만 실행
    enabled: !!contestId, // contestId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  });
}
