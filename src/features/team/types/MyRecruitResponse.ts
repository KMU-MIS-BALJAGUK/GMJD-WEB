//src/features/team/types/MyRecruitResponse.ts

export interface MyRecruitTeamItemDto {
  teamId: number;
  contestImageUrl: string;
  contestName: string;
  contestOrganizationName: string;
  maxMember: number;
  memberCount: number;
  requestedCount: number;
  status: string;
}

export interface MyRecruitListData {
  recruitList: MyRecruitTeamItemDto[];
}

export interface MyRecruitResponse {
  code: number;
  msg: string;
  data: MyRecruitListData;
}
