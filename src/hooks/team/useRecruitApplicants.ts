// src/hooks/team/useRecruitApplicants.ts
// 팀 지원자 목록 조회 훅

import { useQuery } from '@tanstack/react-query';
import { fetchRecruitApplicants } from '@/lib/api/team/team';
import { RecruitApplicantDto } from '@/features/team/types/MyRecruitApplicantsResponse';

export function useRecruitApplicants(teamId: number | null) {
  return useQuery<RecruitApplicantDto[]>({
    queryKey: ['recruitApplicants', teamId],
    queryFn: () => fetchRecruitApplicants(teamId as number),
    enabled: !!teamId,
    staleTime: 1000 * 10, // 10초로 단축
  });
}
