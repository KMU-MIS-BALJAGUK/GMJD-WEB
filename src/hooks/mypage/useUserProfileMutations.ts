// src/hooks/mypage/useUserProfileMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateSkills,
  updateEducationInfo,
  updateCategories,
  updateIntroduction,
} from '@/lib/api/mypage/mypage';
import {
  SkillsRequestDto,
  EducationInfoRequestDto,
  CategoryRequestDto,
  IntroductionRequestDto,
} from '@/features/mypage/types/my-profile-request';

// 쿼리 키 정의
const USER_PROFILE_QUERY_KEY = ['userProfile'];

// 마이프로필 정보 수정을 위한 React Query Mutation
export const useUserProfileMutations = () => {
  const queryClient = useQueryClient();

  // 모든 수정 작업 성공 시 호출되어 캐시를 무효화하는 공통 함수
  const onSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
    alert(message);
  };
  //모든 수정 작업 실패 시 호출되는 공통 에러 핸들러
  const onError = (error: unknown) => {
    console.error('프로필 수정 실패:', error);
    alert('정보 수정에 실패했습니다. 입력값을 확인하거나 잠시 후 다시 시도해 주세요.');
  };

  //  한 줄 소개 수정 Mutation
  const updateIntroMutation = useMutation({
    mutationFn: (body: IntroductionRequestDto) => updateIntroduction(body),
    onSuccess: () => onSuccess('한 줄 소개가 성공적으로 수정되었습니다.'),
    onError,
  });

  // 1. 스킬 수정 Mutation
  const updateSkillsMutation = useMutation({
    mutationFn: (body: SkillsRequestDto) => updateSkills(body),
    onSuccess: () => onSuccess('스킬셋 정보가 성공적으로 수정되었습니다.'),
    onError,
  });

  // 2. 학력 수정 Mutation
  const updateEducationMutation = useMutation({
    mutationFn: (body: EducationInfoRequestDto) => updateEducationInfo(body),
    onSuccess: () => onSuccess('학력 정보가 성공적으로 수정되었습니다.'),
    onError,
  });

  // 3. 관심분야 수정 Mutation
  const updateCategoriesMutation = useMutation({
    mutationFn: (body: CategoryRequestDto) => updateCategories(body),
    onSuccess: () => onSuccess('관심분야 정보가 성공적으로 수정되었습니다.'),
    onError,
  });

  return {
    updateIntroMutation,
    updateSkillsMutation,
    updateEducationMutation,
    updateCategoriesMutation,
  };
};
