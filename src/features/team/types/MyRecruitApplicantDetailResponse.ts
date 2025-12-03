export interface RecruitApplicantDetailDto {
  userId: number;
  profileImageUrl: string;
  name: string;
  level: number;
  aiTags: string[];
  skills: string[];
  qaList: { question: string; answer: string }[];
  // 처리 상태가 내려온다면 사용 (예: PENDING, ACCEPTED, REJECTED)
  status?: string;
}

export interface RecruitApplicantDetailResponse {
  code: number;
  msg: string;
  data: RecruitApplicantDetailDto;
}
