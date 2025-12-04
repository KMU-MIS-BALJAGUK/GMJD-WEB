// 팀 상세 조회 DTO - GET /api/v1/teams/{teamId}/detail

export interface MemberDto {
  memberId: number;
  profileImageUrl: string;
  name: string;
  memberType: string; // "LEADER" or "MEMBER"
}

// 팀 상세 정보 DTO
export interface TeamDetailDto {
  teamTitle: string;
  contestName: string;
  contestOrganizationName: string;
  memberCount: number;
  myMemberType: string; // "LEADER" or "MEMBER"
  memo?: string;
  members: MemberDto[];
  contestId: number;
}

// 팀 상세 응답 DTO 
export interface TeamDetailResponseDto {
  code: number;
  msg: string;
  data: TeamDetailDto;
}