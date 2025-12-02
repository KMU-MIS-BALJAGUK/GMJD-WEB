export interface RecruitApplicantDetailDto {
  userId: number;
  profileImageUrl: string;
  name: string;
  level: number;
  aiTags: string[];
  skills: string[];
  qaList: { question: string; answer: string }[];
}

export interface RecruitApplicantDetailDataDto {
  applicant: RecruitApplicantDetailDto;
}

export interface RecruitApplicantDetailResponse {
  code: number;
  msg: string;
  data: RecruitApplicantDetailDataDto;
}
