// src/hooks/team/useTeamDetail.ts
// 팀 상세 정보를 조회하는 훅

import { useQuery } from '@tanstack/react-query';
import { fetchMyTeamDetail } from '@/lib/api/team/team';
import { MyTeamDetailDto } from '@/features/team/types/MyTeamDetailResponse';

// 팀 상세 정보를 조회하는 React Query 훅
export function useTeamDetail(teamId: number | null) {
  return useQuery<MyTeamDetailDto, Error>({
    queryKey: ['teamDetail', teamId],
    queryFn: () => fetchMyTeamDetail(teamId!), // enabled: false이면 실행되지 않으므로 ! 단언 사용 가능
    enabled: !!teamId,
  });
}
