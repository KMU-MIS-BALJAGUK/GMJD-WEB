//src/hooks/team/useMyRecruitTeams.ts

import { useQuery } from '@tanstack/react-query';
import { MyRecruitItemDto } from '@/features/team/types/MyRecruitResponse';
import { fetchMyRecruitList } from '@/lib/api/team/team';

export function useMyRecruitTeams() {
  return useQuery<MyRecruitItemDto[]>({
    queryKey: ['myRecruitTeams'],
    queryFn: fetchMyRecruitList,
    staleTime: 1000 * 30, // 30초로 단축
  });
}
