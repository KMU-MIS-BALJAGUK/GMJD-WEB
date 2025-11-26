// src/features/mypage/types/MyApplyCancelRequest.ts
// 팀 지원 취소 API 요청 DTO
// TODO: 해당 API의 요청 JSON 구조를 여기에 추가하세요.
// 일반적으로 취소할 지원 ID가 포함됩니다.

export interface MyApplyCancelRequest {
  applicationId: number; // 취소할 지원 ID
}
