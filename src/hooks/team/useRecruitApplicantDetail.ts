// src/hooks/team/useRecruitApplicantDetail.ts
// 팀 지원자 상세 조회 훅

import { useQuery } from '@tanstack/react-query';
import { fetchRecruitApplicantDetail } from '@/lib/api/team/team';
import { RecruitApplicantDetailDto } from '@/features/team/types/MyRecruitApplicantDetailResponse';

export function useRecruitApplicantDetail(teamId: number | null, applicantUserId: number | null) {
  return useQuery<RecruitApplicantDetailDto, unknown>({
    queryKey: ['recruitApplicantDetail', teamId, applicantUserId],
    queryFn: () => fetchRecruitApplicantDetail(teamId as number, applicantUserId as number),
    enabled: !!teamId && !!applicantUserId,
    staleTime: 1000 * 60 * 1,
  });
}
