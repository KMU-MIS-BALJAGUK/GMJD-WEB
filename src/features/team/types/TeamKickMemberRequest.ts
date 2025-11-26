// src/features/team/types/TeamKickMemberRequest.ts
// 팀원 내보내기 API 요청 DTO
// TODO: 해당 API의 요청 JSON 구조를 여기에 추가하세요.
// 일반적으로 내보낼 팀원의 ID가 포함됩니다.

export interface TeamKickMemberRequest {
  memberId: number; // 내보낼 팀원 ID
}
