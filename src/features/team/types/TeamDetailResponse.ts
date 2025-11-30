// 팀 상세 조회 DTO
//  - GET /api/v1/teams/{teamId}/detail

export interface MemberDto {
  memberId: number;
  name: string;
  // profileImageUrl, role 등 추가될 수 있음
}

// 팀 상세 정보 DTO 
export interface TeamDetailDto {
    title: string;           // 팀 제목
    leaderName: string;      // 팀장 이름
    createdAt: string;       // 팀 생성일 (예: "2025.06.30")
    memberCount: number;     // 현재 팀원 수
    maxMember: number;       // 최대 팀원 수
    contestEndDate: string;  // 공모전 마감일 (예: "2025.06.30")
    introduction: string;    // 팀 소개
    questionList: string[];  // 팀 신청 시 질문 리스트
  }
  
  // 팀 상세 응답 DTO 
  export interface TeamDetailResponseDto {
    code: number;
    msg: string;
    data: TeamDetailDto;
  }
  