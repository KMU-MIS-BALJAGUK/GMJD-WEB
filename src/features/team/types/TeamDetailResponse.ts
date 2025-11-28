// src/features/team/types/TeamDetailResponse.ts
// 팀 상세 조회 API 응답 DTO

export interface TeamDetailDto {
  title: string;
  leaderName: string;
  createdAt: string;
  memberCount: number;
  maxMember: number;
  contestEndDate: string;
  introduction: string;
  questionList: string[];
}

export interface TeamDetailResponse {
  code: number;
  msg: string;
  data: TeamDetailDto;
}