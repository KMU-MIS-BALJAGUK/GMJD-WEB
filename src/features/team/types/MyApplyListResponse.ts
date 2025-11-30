//src/features/team/types/MyApplyListResponse.ts
// 나의 지원 목록 조회 API 응답 DTO

export interface MyApplyItemDto {
  applicationId: number;
  teamId: number;

  contestName: string;
  contestImageUrl: string;

  teamTitle: string;
  memberCount: number;

  // 팀 모집 상태 (OPEN, CLOSED)
  recruitStatus: 'OPEN' | 'CLOSED';

  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface MyApplyListDataDto {
  myApplyList: MyApplyItemDto[];
}

export interface MyApplyListResponse {
  code: number;
  msg: string;
  data: MyApplyListDataDto;
}
