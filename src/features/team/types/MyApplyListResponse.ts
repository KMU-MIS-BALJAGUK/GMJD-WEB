// src/features/team/types/MyApplyListResponse.ts
// 나의 지원 목록 조회 API 응답 DTO

export interface MyApplyItemDto {
  applicationId: number;
  teamId: number;

  contestName: string;
  contestImageUrl: string;

  teamTitle: string;
  memberCount: number;

  // 팀 모집 상태 (모집중, 모집완료)
  recruitStatus: '모집중' | '모집완료';

  // 모집 상태를 나타내는 필드 (모집중, 모집완료)
  status: '모집중' | '모집완료';

  // 지원자 수 (있을 경우 사용)
  requestedCount?: number;
}

export interface MyApplyListDataDto {
  myApplyList: MyApplyItemDto[];
}

export interface MyApplyListResponse {
  code: number;
  msg: string;
  data: MyApplyListDataDto;
}
