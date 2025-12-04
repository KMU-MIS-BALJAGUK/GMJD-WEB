// src/hooks/team/useKickTeamMember.ts
// 팀원을 내보내는 뮤테이션 훅

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kickTeamMember } from '@/lib/api/team/team';
import { TeamKickMemberResponse } from '@/features/team/types/TeamKickMemberResponse';

export function useKickTeamMember() {
  const queryClient = useQueryClient();

  return useMutation<TeamKickMemberResponse, Error, { teamId: number; userId: number }>({
    mutationFn: ({ teamId, userId }) => kickTeamMember(teamId, userId),
    onSuccess: (_data, variables) => {
      // 성공 시 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['teamDetail', variables.teamId] });
      queryClient.invalidateQueries({ queryKey: ['myTeamDetail', variables.teamId] });
      queryClient.invalidateQueries({ queryKey: ['recruitApplicants', variables.teamId] });
    },
  });
}
