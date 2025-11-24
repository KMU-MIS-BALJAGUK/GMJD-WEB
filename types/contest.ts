// 공모전 타입 정의
export interface Contest {
    id: number;
    title: string;
    organizer: string; // 주최기관
    posterUrl: string; // 포스터 이미지
    category: string; // 분야 (IT, 디자인, 기획 등)
    startDate: string;
    endDate: string;
    prize: string; // 상금
    description: string; // 상세 설명
    requirements: string; // 참가 요건
    homepageUrl?: string; // 공모전 홈페이지
    status: 'recruiting' | 'ongoing' | 'ended'; // 모집중, 진행중, 종료
    viewCount: number; // 조회수
    bookmarkCount: number; // 북마크 수
    createdAt: string;
    updatedAt: string;
  }
  
  // 팀 타입 정의
  export interface Team {
    id: number;
    contestId: number;
    teamName: string;
    description: string;
    leaderName: string;
    leaderProfile?: string; // 리더 프로필 이미지
    currentMembers: number;
    maxMembers: number;
    requiredPositions: Position[]; // 필요한 포지션
    tags: string[]; // 팀 태그 (열정적인, 실력파 등)
    status: 'recruiting' | 'closed'; // 모집중, 모집완료
    createdAt: string;
  }
  
  // 포지션 타입
  export interface Position {
    role: string; // 역할 (프론트엔드, 백엔드, 디자이너 등)
    count: number; // 필요 인원
    currentCount: number; // 현재 인원
  }
  
  // API 응답 타입
  export interface ContestDetailResponse {
    contest: Contest;
    teams: Team[];
  }
  
  export interface TeamListResponse {
    teams: Team[];
    totalCount: number;
  }