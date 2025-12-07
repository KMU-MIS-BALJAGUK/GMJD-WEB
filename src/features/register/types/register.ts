// 회원가입 POST 데이터 DTO
export interface UserProfileDto {
  introduction: string;
  education: 'HIGH_SCHOOL' | 'UNIVERSITY' | 'MASTER';
  universityName: string | null;
  recognizedDegree: string | null;
  major: string | null;
  categoryIds: number[];
  skills: string[];
}

// 회원가입 API 응답 DTO
export interface UserSignUpResponseDto {
  code: number;
  msg: string;
  data: Record<string, never>;
}
