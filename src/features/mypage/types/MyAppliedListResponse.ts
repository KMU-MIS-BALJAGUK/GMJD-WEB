// src/features/mypage/types/MyAppliedListResponse.ts
// 나의 지원 목록 조회 API 응답 DTO

import { ApiResponse } from '@/types/api';

export interface MyApplicationItemDto {
  recruitStatus: "OPEN" | "CLOSED";
  applicationId: number;
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

export type MyAppliedListResponse = ApiResponse<MyApplicationListDataDto>;