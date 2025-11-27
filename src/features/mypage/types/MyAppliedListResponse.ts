// src/features/mypage/types/MyAppliedListResponse.ts
// 나의 지원 목록 조회 API 응답 DTO

export interface MyApplicationItemDto {
  teamId: number;
  contestImageUrl: string;
  contestName: string;
  teamTitle: string;
  maxMember: number;
  memberCount: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'; // "PENDING", "ACCEPTED", "REJECTED" 등
}

export interface MyApplicationListDataDto {
    myApplyList: MyApplicationItemDto[];
}

export interface MyAppliedListResponse {
  code: number;
  msg: string;
  data: MyApplicationListDataDto;
}