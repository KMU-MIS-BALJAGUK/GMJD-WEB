export interface MyRecruitItemDto {
  teamId: number;
  contestImageUrl: string;
  contestName: string;
  contestOrganizationName: string;
  maxMember: number;
  memberCount: number;
  requestedCount: number;
  status: 'OPEN' | 'CLOSED';
}

export interface MyRecruitListDataDto {
  recruitList: MyRecruitItemDto[];
}

export interface MyRecruitListResponse {
  code: number;
  msg: string;
  data: MyRecruitListDataDto;
}
