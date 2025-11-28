import api from '@/lib/axios';
import { ContestListResponseDto } from '@/features/contest/types/contest-response';
import {
  ContestFilterParams,
  ContestSearchKeywordDto,
} from '@/features/contest/types/contest-request';
import qs from 'qs';

// 필터링 및 정렬된 공모전 조회 API
export async function fetchContestList(params: ContestFilterParams) {
  const response = await api.get<ContestListResponseDto>(`/api/v1/contests`, {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  return response.data.data.contests;
}

// 공모전 검색 API
export async function searchContests(params: ContestFilterParams, body: ContestSearchKeywordDto) {
  const response = await api.post<ContestListResponseDto>('/api/v1/contests/search', body, {
    params,
  });

  return response.data.data.contests;
}
