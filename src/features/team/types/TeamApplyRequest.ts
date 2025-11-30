// 팀 신청 DTO
//  - POST /api/v1/teams/apply/{teamId}

// 팀 신청 요청 DTO (RequestPopup → 서버) 
export interface TeamApplyRequestDto {
    answer: string[]; // 각 질문에 대한 답변 배열
    skills: string[]; // 스킬 태그 리스트
  }
  