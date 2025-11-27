// src/lib/api/team/team.ts
// 팀 관련 API 호출 함수

import api from '@/lib/axios';
import { MyTeamListResponse } from '@/features/mypage/types/MyTeamListResponse';
import { TeamDetailResponse, TeamDetailDto } from '@/features/team/types/TeamDetailResponse';
import { TeamMemoUpdateRequest } from '@/features/team/types/TeamMemoUpdateRequest';
import { TeamKickMemberRequest } from '@/features/team/types/TeamKickMemberRequest';
import { TeamKickMemberResponse } from '@/features/team/types/TeamKickMemberResponse';

// 나의 팀 목록 조회 API
export async function fetchMyTeamList() {
  const response = await api.get<MyTeamListResponse>('/my/teams');
  return response.data.data.teams;
}

// 팀 상세 조회 API
export async function fetchTeamDetail(teamId: number): Promise<TeamDetailDto> {
  const response = await api.get<TeamDetailResponse>(`/teams/${teamId}`);
  return response.data.data;
}

// 팀 메모 수정 API
export async function updateTeamMemo(teamId: number, data: TeamMemoUpdateRequest) {
  const response = await api.patch(`/teams/${teamId}/memo`, data);
  return response.data;
}

// 팀원 내보내기 API
export async function kickTeamMember(teamId: number, data: TeamKickMemberRequest) {
  const response = await api.post<TeamKickMemberResponse>(`/teams/${teamId}/kick`, data);
  return response.data;
}
