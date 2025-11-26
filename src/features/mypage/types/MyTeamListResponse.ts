// src/features/mypage/types/MyTeamListResponse.ts
// 나의 팀 목록 조회 API 응답 DTO

export interface MyTeamItemDto {
  teamId: number;
  contestImageUrl: string;
  contestName: string;
  contestOrganizationName: string;
  maxMember: number;
  memberCount: number;
  type: string;
}

export interface MyTeamListDataDto {
  teams: MyTeamItemDto[];
}

export interface MyTeamListResponse {
  code: number;
  msg: string;
  data: MyTeamListDataDto;
}