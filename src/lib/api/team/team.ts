// src/lib/api/team/team.ts
// 팀 관련 API 호출 함수

import api from '@/lib/axios';
import { MyApplyItemDto, MyApplyListResponse } from '@/features/team/types/MyApplyListResponse';
import { MyRecruitItemDto, MyRecruitListResponse } from '@/features/team/types/MyRecruitResponse';
import { MyTeamItemDto, MyTeamListResponse } from '@/features/team/types/MyTeamListResponse';
import { TeamDetailResponseDto, TeamDetailDto } from '@/features/team/types/TeamDetailResponse';
import { TeamKickMemberResponse } from '@/features/team/types/TeamKickMemberResponse';
import { TeamMemoUpdateRequest } from '@/features/team/types/TeamMemoUpdateRequest';
import { TeamMemoUpdateResponse } from '@/features/team/types/TeamMemoUpdateResponse';
import { RecruitApplicantsResponse, RecruitApplicantDto } from '@/features/team/types/MyRecruitApplicantsResponse';
import { RecruitApplicantDetailResponse, RecruitApplicantDetailDto } from '@/features/team/types/MyRecruitApplicantDetailResponse';

import type { TeamApplyRequestDto } from '@/features/team/types/TeamApplyRequest';
import type { TeamApplyResponseDto } from '@/features/team/types/TeamApplyResponse';
import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
import type { TeamCreateResponseDto } from '@/features/team/types/TeamCreateResponse';
import type { AiQuestionRecommendResponseDto } from '@/features/team/types/AiQuestionRecommendResponse';

type ApiBaseResponse = {
  code: number;
  msg: string;
  data: unknown;
};



// 나의 팀 목록 조회 API
export async function fetchMyTeamList(): Promise<MyTeamItemDto[]> {
  const response = await api.get<MyTeamListResponse>('/api/v1/teams/my-teams');
  return response.data.data.teams;
}

// 팀 상세 조회 API
export async function fetchTeamDetail(teamId: number): Promise<TeamDetailDto> {
  const response = await api.get<TeamDetailResponseDto>(`/api/v1/teams/${teamId}/detail`);
  return response.data.data;
}

// 공개 팀 상세 조회 (팀 신청용 상세 페이지)
// GET /api/v1/teams/{teamId}/detail
export async function fetchTeamDetailPublic(teamId: number): Promise<TeamDetailDto> {
  const res = await api.get<TeamDetailResponseDto>(`/api/v1/teams/${teamId}/detail`);
  return res.data.data;
}

// 팀 메모 수정 API
export async function updateTeamMemo(teamId: number, data: TeamMemoUpdateRequest): Promise<TeamMemoUpdateResponse> {
  const response = await api.patch<TeamMemoUpdateResponse>(`/api/v1/teams/my-teams/${teamId}/memo`, data);
  return response.data;
}

// 팀원 내보내기 API
export async function kickTeamMember(teamId: number, memberId: number): Promise<TeamKickMemberResponse> {
  const response = await api.delete<TeamKickMemberResponse>(`/api/v1/teams/${teamId}/members/${memberId}`);
  return response.data;
}








// 팀 신청
// POST /api/v1/teams/apply/{teamId}
export async function applyTeam(
  teamId: number,
  payload: TeamApplyRequestDto,
) {
  const res = await api.post<TeamApplyResponseDto>(
    `/api/v1/teams/apply/${teamId}`,
    payload,
  );
  return res.data; // { code, msg, data: {} }
}


// 팀 생성
// POST /api/v1/teams/{contestId}

export async function createTeam(
  contestId: number,
  payload: TeamCreateRequestDto,
) {
  const res = await api.post<TeamCreateResponseDto>(
    `/api/v1/teams/${contestId}`,
    payload,
  );
  return res.data; // { code, msg, data: {} }
}

// AI 질문 추천
// POST /api/v1/teams/{contestId}/ai-question

export async function fetchAiQuestions(contestId: number) {
  const res = await api.post<AiQuestionRecommendResponseDto>(
    `/api/v1/teams/${contestId}/ai-question`,
  );
  return res.data.data.aiRecommendQuestionList; // string[]
}



// 나의 모집 팀 목록 조회 API (리더인 팀 목록)
export async function fetchMyRecruitList(): Promise<MyRecruitItemDto[]> {
  const response = await api.get<MyRecruitListResponse>('/api/v1/teams/my-recruit');
  return response.data.data.recruitList;
}

// 팀 모집 마감
export async function closeRecruitTeam(teamId: number): Promise<ApiBaseResponse> {
  const response = await api.patch<ApiBaseResponse>(`/api/v1/teams/${teamId}/close`);
  return response.data;
}

// 팀 지원자 목록 조회
export async function fetchRecruitApplicants(teamId: number): Promise<RecruitApplicantDto[]> {
  const response = await api.get<RecruitApplicantsResponse>(`/api/v1/teams/my-recruit/${teamId}`);
  return response.data.data.applicants;
}

// 팀 지원자 상세 조회
export async function fetchRecruitApplicantDetail(
  teamId: number,
  applicantUserId: number,
): Promise<RecruitApplicantDetailDto> {
  const response = await api.get<RecruitApplicantDetailResponse>(
    `/api/v1/teams/my-recruit/${teamId}/applicant/${applicantUserId}`,
  );
  return response.data.data.applicant;
}

// 나의 지원 목록 조회 API
export async function fetchMyAppliedList(): Promise<MyApplyItemDto[]> {
  const response = await api.get<MyApplyListResponse>('/api/v1/teams/my-applies');

  return response.data?.data?.myApplyList ?? [];
}

