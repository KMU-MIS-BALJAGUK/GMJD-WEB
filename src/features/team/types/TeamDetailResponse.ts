// src/features/team/types/TeamDetailResponse.ts
// 팀 상세 조회 API 응답 DTO

export interface MemberDto {
  memberId: number;
  name: string;
  // profileImageUrl, role 등 추가될 수 있음
}

export interface TeamDetailDto {
  title: string;
  leaderName: string;
  createdAt: string;
  memberCount: number;
  maxMember: number;
  contestEndDate: string;
  introduction: string;
  questionList: string[];
  memo: string;
  members: MemberDto[];
}

export interface TeamDetailResponse {
  code: number;
  msg: string;
  data: TeamDetailDto;
}