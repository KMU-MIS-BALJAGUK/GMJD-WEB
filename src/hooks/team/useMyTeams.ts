// 나의 팀 목록을 조회하는 훅

import { useQuery } from '@tanstack/react-query';
import { fetchMyTeamList } from '@/lib/api/team/team';
import { MyTeamItemDto } from '@/features/mypage/types/MyTeamListResponse';

// 나의 팀 목록을 조회하는 React Query 훅
export function useMyTeams() {
  return useQuery<MyTeamItemDto[], Error>({
    queryKey: ['myTeams'],
    queryFn: fetchMyTeamList,
  });
}
