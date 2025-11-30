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

  return {
    contests: response.data.data.contests,
    totalElements: response.data.data.totalElements,
    totalPages: response.data.data.totalPages,
  };
}


// Contest types
import { ContestDetailResponseDto } from '@/features/contest/types/ContestDetailResponse';
import { ContestTeamListResponseDto } from '@/features/contest/types/ContestTeamListResponse';

// Team 생성/신청은 team.ts에서 처리
import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
import type { AiQuestionRecommendResponseDto } from '@/features/team/types/AiQuestionRecommendResponse';


// 공모전 상세 조회 API
// GET /api/v1/contests/{contestId}
export async function fetchContestDetail(contestId: number) {
  const res = await api.get<ContestDetailResponseDto>(
    `/api/v1/contests/${contestId}`
  );
  return res.data.data;
}

// 공모전별 팀 목록 조회 API
// GET /api/v1/teams/{contestId}
export async function fetchContestTeams(contestId: number) {
  const res = await api.get<ContestTeamListResponseDto>(
    `/api/v1/teams/${contestId}`
  );
  return res.data.data.teams;
}

// 팀 생성 요청 (공모전 페이지에서 사용)
// POST /api/v1/teams/{contestId}
export async function createTeam(contestId: number, payload: TeamCreateRequestDto) {
  const res = await api.post(`/api/v1/teams/${contestId}`, payload);
  return res.data;
}

// AI 추천 질문
// POST /api/v1/teams/{contestId}/ai-question
export async function fetchAiQuestions(contestId: number) {
  const res = await api.post<AiQuestionRecommendResponseDto>(
    `/api/v1/teams/${contestId}/ai-question`
  );
  return res.data.data.aiRecommendQuestionList;
}
