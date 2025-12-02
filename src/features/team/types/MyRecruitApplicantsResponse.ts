export interface RecruitApplicantDto {
  userId: number;
  profileImageUrl: string;
  name: string;
  aiTags: string[];
}

export interface RecruitApplicantsDataDto {
  teamId: number;
  applicants: RecruitApplicantDto[];
}

export interface RecruitApplicantsResponse {
  code: number;
  msg: string;
  data: RecruitApplicantsDataDto;
}
