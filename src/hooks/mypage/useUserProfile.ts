import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile } from '@/lib/api/mypage/mypage';

const USER_PROFILE_QUERY_KEY = ['userProfile'];

//마이프로필 정보를 조회하고 캐시에 저장
export const useUserProfile = () => {
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 10,
  });
};

export const invalidateUserProfileCache = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY, exact: false });
};
