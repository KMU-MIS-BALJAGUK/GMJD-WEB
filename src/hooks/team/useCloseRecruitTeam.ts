// src/hooks/team/useCloseRecruitTeam.ts
// 팀 모집을 마감하는 React Query 뮤테이션 훅

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { closeRecruitTeam } from '@/lib/api/team/team';

export function useCloseRecruitTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: number) => closeRecruitTeam(teamId),
    onSuccess: (_data, teamId) => {
      // 목록/상세 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['myRecruitTeams'] });
      queryClient.invalidateQueries({ queryKey: ['teamDetail', teamId] });
    },
  });
}
