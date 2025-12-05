// src/hooks/team/useMyTeamDetail.ts
// 나의 팀 상세 조회 (팀원 목록 포함)

import { useQuery } from '@tanstack/react-query';
import { fetchMyTeamDetail } from '@/lib/api/team/team';
import { MyTeamDetailDto } from '@/features/team/types/MyTeamDetailResponse';

export function useMyTeamDetail(teamId: number | null) {
  return useQuery<MyTeamDetailDto, Error>({
    queryKey: ['myTeamDetail', teamId],
    queryFn: () => fetchMyTeamDetail(teamId as number),
    enabled: !!teamId,
  });
}
