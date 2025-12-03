// src/hooks/team/useRejectRecruitApplicant.ts
// 팀 지원자 거절 뮤테이션 훅

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rejectRecruitApplicant } from '@/lib/api/team/team';

export function useRejectRecruitApplicant() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { teamId: number; applicantUserId: number }>({
    mutationFn: ({ teamId, applicantUserId }) => rejectRecruitApplicant(teamId, applicantUserId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['recruitApplicants', variables.teamId] });
      queryClient.invalidateQueries({
        queryKey: ['recruitApplicantDetail', variables.teamId, variables.applicantUserId],
      });
      queryClient.invalidateQueries({ queryKey: ['myRecruitTeams'] });
    },
  });
}
