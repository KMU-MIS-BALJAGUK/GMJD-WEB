// 공모전별 팀 목록 조회 DTO
//  - GET /api/v1/teams/{contestId}

// 공모전 상세 페이지 - 팀 리스트 아이템 DTO 
export interface ContestTeamItemDto {
    teamId: number;           // 팀 ID
    title: string;            // 팀 이름 / 모집 제목
    maxMember: number;        // 최대 인원
    currentMemberCount: number; // 현재 인원
    status: 'OPEN' | 'CLOSED';  // 팀 상태 (스웨거 기준 OPEN)
  }
  
  // 공모전 상세 페이지 - 팀 리스트 응답 DTO
  export interface ContestTeamListResponseDto {
    code: number;
    msg: string;
    data: {
      teams: ContestTeamItemDto[];
    };
  }