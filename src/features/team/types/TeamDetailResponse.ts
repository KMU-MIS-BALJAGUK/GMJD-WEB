// 팀 상세 조회 DTO - GET /api/v1/teams/{teamId}/detail

export interface MemberDto {
  memberId: number;
  userId: number;
  profileImageUrl: string;
  name: string;
  memberType: '팀장' | '팀원';
}

// 팀 상세 정보 DTO
export interface TeamDetailDto {
  teamTitle: string;
  // legacy / UI expects `title` in some places — keep both
  title?: string;
  contestName: string;
  contestOrganizationName: string;
  memberCount: number;
  myMemberType: string; // "LEADER" or "MEMBER"
  memo?: string;
  members: MemberDto[];
  contestId: number;

  // Additional optional fields used by some popups/components
  leaderName?: string;
  createdAt?: string;
  introduction?: string;
  questionList?: string[];
  contestEndDate?: string;
  // some APIs use `maxMember` / `maxMembers` naming — accept both
  maxMember?: number;
  maxMembers?: number;
}

// 팀 상세 응답 DTO 
export interface TeamDetailResponseDto {
  code: number;
  msg: string;
  data: TeamDetailDto;
}