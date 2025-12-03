// src/hooks/team/useAcceptRecruitApplicant.ts
// 팀 지원자 수락 뮤테이션 훅

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptRecruitApplicant } from '@/lib/api/team/team';

export function useAcceptRecruitApplicant() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { teamId: number; applicantUserId: number }>({
    mutationFn: ({ teamId, applicantUserId }) => acceptRecruitApplicant(teamId, applicantUserId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['recruitApplicants', variables.teamId] });
      queryClient.invalidateQueries({
        queryKey: ['recruitApplicantDetail', variables.teamId, variables.applicantUserId],
      });
      queryClient.invalidateQueries({ queryKey: ['myRecruitTeams'] });
    },
  });
}
