// src/hooks/team/useKickTeamMember.ts
// 팀원을 내보내는 훅

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kickTeamMember } from '@/lib/api/team/team';
import { TeamKickMemberRequest } from '@/features/team/types/TeamKickMemberRequest';

// 팀원을 내보내는 React Query 훅
export function useKickTeamMember() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { teamId: number; data: TeamKickMemberRequest }>({
    mutationFn: ({ teamId, data }) => kickTeamMember(teamId, data),
    onSuccess: (data, variables) => {
      // 성공 시, 해당 팀 상세 정보 쿼리를 무효화하여 팀원 목록을 재조회합니다.
      queryClient.invalidateQueries({ queryKey: ['teamDetail', variables.teamId] });
    },
  });
}
