// src/hooks/mypage/useCancelApplication.ts
// 팀 지원 취소를 하는 훅

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelApplication } from '@/lib/api/mypage/mypage';
import { MyApplyCancelRequest } from '@/features/mypage/types/MyApplyCancelRequest';
import { MyApplyCancelResponse } from '@/features/mypage/types/MyApplyCancelResponse';

// 팀 지원 취소를 하는 React Query 훅
export function useCancelApplication() {
  const queryClient = useQueryClient();

  return useMutation<MyApplyCancelResponse, Error, { teamId: number; data: MyApplyCancelRequest }>({
    mutationFn: ({ teamId, data }) => cancelApplication(teamId, data),
    onSuccess: () => {
      // 성공 시, 나의 지원 목록 쿼리를 무효화하여 재조회합니다.
      queryClient.invalidateQueries({ queryKey: ['myAppliedList'] });
    },
  });
}
