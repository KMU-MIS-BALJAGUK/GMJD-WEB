// src/hooks/team/useUpdateTeamMemo.ts
// 팀 메모를 수정하는 훅

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTeamMemo } from '@/lib/api/team/team';
import { TeamMemoUpdateRequest } from '@/features/team/types/TeamMemoUpdateRequest';
import { TeamMemoUpdateResponse } from '@/features/team/types/TeamMemoUpdateResponse';

// 팀 메모를 수정하는 React Query 훅
export function useUpdateTeamMemo() {
  const queryClient = useQueryClient();

  return useMutation<TeamMemoUpdateResponse, Error, { teamId: number; data: TeamMemoUpdateRequest }>({
    mutationFn: ({ teamId, data }) => updateTeamMemo(teamId, data),
    onSuccess: (data, variables) => {
      // 성공 시, 해당 팀 상세 정보 쿼리를 무효화하여 재조회합니다.
      queryClient.invalidateQueries({ queryKey: ['teamDetail', variables.teamId] });
    },
  });
}
