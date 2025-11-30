// src/lib/api/team/team.ts
// 팀 관련 API 호출 함수

import api from '@/lib/axios';
import { MyTeamItemDto, MyTeamListResponse } from '@/features/team/types/MyTeamListResponse';
import { TeamDetailResponseDto, TeamDetailDto } from '@/features/team/types/TeamDetailResponse';
import { TeamMemoUpdateRequest } from '@/features/team/types/TeamMemoUpdateRequest';
import { TeamMemoUpdateResponse } from '@/features/team/types/TeamMemoUpdateResponse';
import { TeamKickMemberRequest } from '@/features/team/types/TeamKickMemberRequest';
import { TeamKickMemberResponse } from '@/features/team/types/TeamKickMemberResponse';

import type { TeamApplyRequestDto } from '@/features/team/types/TeamApplyRequest';
import type { TeamApplyResponseDto } from '@/features/team/types/TeamApplyResponse';
import type { TeamCreateRequestDto } from '@/features/team/types/TeamCreateRequest';
import type { TeamCreateResponseDto } from '@/features/team/types/TeamCreateResponse';
import type { AiQuestionRecommendResponseDto } from '@/features/team/types/AiQuestionRecommendResponse';


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


