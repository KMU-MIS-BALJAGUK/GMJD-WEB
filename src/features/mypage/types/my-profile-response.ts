// 마이페이지 - 유저 프로필 상세 데이터 DTO
export interface UserProfileDataDto {
  profileImageUrl: string;
  name: string;
  introduction: string;
  level: number;
  email: string;
  universityName: string;
  major: string;
  education: string;
  recognizedDegree: string;
  skillList: string[];
  categoryList: string[];
}

// 마이페이지 - 유저 프로필 조회 최종 응답 DTO
export interface UserProfileResponseDto {
  code: number;
  msg: string;
  data: UserProfileDataDto;
}
