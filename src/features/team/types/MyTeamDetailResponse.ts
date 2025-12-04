// 나의 팀 상세 조회 (GET /api/v1/teams/my-teams/{teamId})

import { ReactNode } from 'react';

export interface MyTeamMemberDto {
  userId: number;
  memberId: number;
  profileImageUrl?: string;
  name: string;
  memberType: string;
}

export interface MyTeamDetailDto {
  introduction: ReactNode;
  leaderName: ReactNode;
  title: ReactNode;
  contestId: any;
  teamTitle: string;
  contestName: string;
  contestOrganizationName: string;
  memberCount: number;
  myMemberType: string;
  maxMember: number;
  members: MyTeamMemberDto[];
  memo?: string;
}

export interface MyTeamDetailResponseDto {
  code: number;
  msg: string;
  data: MyTeamDetailDto;
}
