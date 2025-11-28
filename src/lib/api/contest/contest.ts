import api from '@/lib/axios';
import { ContestSearchKeywordDto, ContestsParams } from '@/features/contest/types/contest-request';
import qs from 'qs';

// 공모전 조회 API
export async function fetchContestsList(params: ContestsParams, body: ContestSearchKeywordDto) {
  console.log('📤 보내는 body:', body);
  console.log('📤 보내는 params:', params);

  const response = await api.post(`/api/v1/contests`, body, {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  return response.data.data.contests;
}
