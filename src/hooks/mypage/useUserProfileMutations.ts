// src/hooks/mypage/useUserProfileMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSkills, updateEducationInfo, updateCategories } from '@/lib/api/mypage/mypage';
import {
  SkillsRequestDto,
  EducationInfoRequestDto,
  CategoryRequestDto,
} from '@/features/mypage/types/my-profile-request';

// 쿼리 키 정의
const USER_PROFILE_QUERY_KEY = ['userProfile'];

// 마이프로필 정보 수정을 위한 React Query Mutation
export const useUserProfileMutations = () => {
  const queryClient = useQueryClient();

  // 모든 수정 작업 성공 시 호출되어 캐시를 무효화하는 공통 함수
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
  };

  // 1. 스킬 수정 Mutation
  const updateSkillsMutation = useMutation({
    mutationFn: (body: SkillsRequestDto) => updateSkills(body),
    onSuccess,
  });

  // 2. 학력 수정 Mutation
  const updateEducationMutation = useMutation({
    mutationFn: (body: EducationInfoRequestDto) => updateEducationInfo(body),
    onSuccess,
  });

  // 3. 관심분야 수정 Mutation
  const updateCategoriesMutation = useMutation({
    mutationFn: (body: CategoryRequestDto) => updateCategories(body),
    onSuccess,
  });

  return {
    updateSkillsMutation,
    updateEducationMutation,
    updateCategoriesMutation,
  };
};
