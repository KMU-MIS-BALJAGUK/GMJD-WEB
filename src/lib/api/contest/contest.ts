import api from '@/lib/axios';
import { ContestListResponseDto, ContestFilterParams } from '@/types/contest';

// 필터링 및 정렬된 공모전 조회 API
export async function fetchContestList(params: ContestFilterParams) {
  const response = await api.get<ContestListResponseDto>(`/contest/list`, {
    params,
  });

  return response.data.data.contests;
}
