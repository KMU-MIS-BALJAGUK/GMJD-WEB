export interface MyRecruitItemDto {
  teamId: number;
  contestImageUrl: string;
  contestName: string;
  contestOrganizationName: string;
  maxMember: number;
  memberCount: number;
  requestedCount: number;
  status: '모집중' | '모집완료';
}

export interface MyRecruitListDataDto {
  recruitList: MyRecruitItemDto[];
}

export interface MyRecruitListResponse {
  code: number;
  msg: string;
  data: MyRecruitListDataDto;
}
