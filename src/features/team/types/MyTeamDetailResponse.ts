// 나의 팀 상세 조회 (GET /api/v1/teams/my-teams/{teamId})

export interface MyTeamMemberDto {
  memberId: number;
  profileImageUrl?: string;
  name: string;
  memberType: string;
}

export interface MyTeamDetailDto {
  teamTitle: string;
  contestName: string;
  contestOrganizationName: string;
  memberCount: number;
  myMemberType: string;
  members: MyTeamMemberDto[];
  memo?: string;
  contestId: number;
}

export interface MyTeamDetailResponseDto {
  code: number;
  msg: string;
  data: MyTeamDetailDto;
}
