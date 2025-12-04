// src/hooks/team/useExpireTeam.ts
// 모집 마감(CLOSED) 처리 mutation

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { closeRecruitTeam } from '@/lib/api/team/team';

export function useExpireTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: number) => closeRecruitTeam(teamId),
    onSuccess: (_data, teamId) => {
      queryClient.invalidateQueries({ queryKey: ['myRecruitTeams'] });
      queryClient.invalidateQueries({ queryKey: ['teamDetail', teamId] });
      queryClient.invalidateQueries({ queryKey: ['myTeamDetail', teamId] });
    },
  });
}
