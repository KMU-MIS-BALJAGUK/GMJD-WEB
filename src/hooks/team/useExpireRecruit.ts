// src/hooks/team/useExpireRecruit.ts
// 모집 만료(EXPIRED) 처리 mutation

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expireTeam } from '@/lib/api/team/team';

export function useExpireRecruit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: number) => expireTeam(teamId),
    onSuccess: (_data, teamId) => {
      queryClient.invalidateQueries({ queryKey: ['myRecruitTeams'] });
      queryClient.invalidateQueries({ queryKey: ['teamDetail', teamId] });
      queryClient.invalidateQueries({ queryKey: ['myTeamDetail', teamId] });
    },
  });
}
