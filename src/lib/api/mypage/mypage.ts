import api from '@/lib/axios';
import {
  UserProfileResponseDto,
  UserProfileDataDto,
} from '@/features/mypage/types/my-profile-response';
import {
  SkillsRequestDto,
  EducationInfoRequestDto,
  CategoryRequestDto,
  IntroductionRequestDto,
} from '@/features/mypage/types/my-profile-request';
import { MyAppliedListResponse } from '@/features/mypage/types/MyAppliedListResponse';
import { MyApplyCancelRequest } from '@/features/mypage/types/MyApplyCancelRequest';

// 1. 마이프로필 조회 API 호출 함수
export async function fetchUserProfile(): Promise<UserProfileDataDto> {
  const response = await api.get<UserProfileResponseDto>('/api/v1/users/my-profile');

  // 서버에서 받은 data 필드(UserProfileDataDto)만 반환하여 React Query가 캐시하도록 합니다.
  return response.data.data;
}

// --- 프로필 수정 API 호출 함수 ---

// 2. 스킬 수정 API 호출 함수
export async function updateSkills(body: SkillsRequestDto): Promise<void> {
  await api.patch('/api/v1/users/skills', body);
}

// 3. 학력 수정 API 호출 함수
export async function updateEducationInfo(body: EducationInfoRequestDto): Promise<void> {
  await api.patch('/api/v1/users/education', body);
}

// 4. 관심분야 수정 API 호출 함수
export async function updateCategories(body: CategoryRequestDto): Promise<void> {
  await api.patch('/api/v1/users/categories', body);
}

// 5. 한 줄 소개 수정 API 호출 함수
export async function updateIntroduction(body: IntroductionRequestDto): Promise<void> {
  await api.patch('/api/v1/users/introduction', body);
}

// 나의 지원 목록 조회 API
export async function fetchMyAppliedList() {
  const response = await api.get<MyAppliedListResponse>('/api/v1/teams/my-applies');
  return response.data.data.myApplyList;
}

// 신청 취소 API
export async function cancelApplication(teamId: number, data: MyApplyCancelRequest) {
  const response = await api.post(`/api/v1/teams/apply/${teamId}/cancel`, data);
  return response.data;
}
