// src/lib/api/team/team.ts
// 팀 관련 API 호출 함수

import api from '@/lib/axios';
import { MyTeamItemDto, MyTeamListResponse } from '@/features/team/types/MyTeamListResponse';
import { TeamDetailResponse, TeamDetailDto } from '@/features/team/types/TeamDetailResponse';
import { TeamMemoUpdateRequest } from '@/features/team/types/TeamMemoUpdateRequest';
import { TeamMemoUpdateResponse } from '@/features/team/types/TeamMemoUpdateResponse';
import { TeamKickMemberRequest } from '@/features/team/types/TeamKickMemberRequest';
import { TeamKickMemberResponse } from '@/features/team/types/TeamKickMemberResponse';

import * as TeamApi from '@/lib/api/team/team';

console.log("Team API:", TeamApi);

// 나의 팀 목록 조회 API
export async function fetchMyTeamList(): Promise<MyTeamItemDto[]> {
  const response = await api.get<MyTeamListResponse>('/api/v1/teams/my-teams');
  return response.data.data.teams;
}

// 팀 상세 조회 API
export async function fetchTeamDetail(teamId: number): Promise<TeamDetailDto> {
  const response = await api.get<TeamDetailResponse>(`/api/v1/teams/my-teams/${teamId}`);
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

// 나의 모집 팀 목록 조회 API (내가 팀장인 팀 목록)
export async function fetchMyRecruitList() {
  const response = await api.get('/api/v1/teams/my-recruit');
  return response.data.data.recruitList;
}
