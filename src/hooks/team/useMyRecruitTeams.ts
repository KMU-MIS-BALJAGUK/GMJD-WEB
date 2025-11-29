//src/hooks/team/useMyRecruitTeams.ts

import { useQuery } from '@tanstack/react-query';
import { fetchMyRecruitList } from '@/lib/api/team/team';

export function useMyRecruitTeams() {
  return useQuery({
    queryKey: ['myRecruitTeams'],
    queryFn: fetchMyRecruitList,
    staleTime: 1000 * 60 * 5,
  });
}
