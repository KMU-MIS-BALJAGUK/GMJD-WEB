// 팀 생성 DTO
//  - POST /api/v1/teams/{contestId}

// 팀 생성 요청 DTO (MakeTeamPopup → 서버) 
export interface TeamCreateRequestDto {
    title: string;        // 팀 제목
    maxMember: number;    // 최대 인원
    introduction: string; // 팀 소개
    questions: string[];  // 팀 지원 질문 리스트
  }