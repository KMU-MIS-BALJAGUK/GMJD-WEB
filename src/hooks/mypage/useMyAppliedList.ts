// src/hooks/mypage/useMyAppliedList.ts
// 나의 지원 목록을 조회하는 훅

import { useQuery } from '@tanstack/react-query';
import { fetchMyAppliedList } from '@/lib/api/mypage/mypage';
import { MyApplicationItemDto } from '@/features/mypage/types/MyAppliedListResponse';

// 나의 지원 목록을 조회하는 React Query 훅
export function useMyAppliedList() {
  return useQuery<MyApplicationItemDto[], Error>({
    queryKey: ['myAppliedList'],
    queryFn: fetchMyAppliedList,
  });
}
