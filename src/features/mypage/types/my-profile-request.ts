import { EducationLevel, RecognizedDegree } from '@/constants/register';

// 1. 스킬 수정 요청 DTO
export interface SkillsRequestDto {
  skills: string[];
}

// 2. 학력 정보 수정 요청 DTO
export interface EducationInfoRequestDto {
  universityName: string;
  major: string;
  education: EducationLevel;
  recognizedDegree: RecognizedDegree;
}

// 3. 관심분야 수정 요청 DTO
export interface CategoryRequestDto {
  categoryIds: number[];
}
