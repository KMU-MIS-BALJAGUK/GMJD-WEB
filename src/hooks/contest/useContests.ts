import { useQuery } from '@tanstack/react-query';
import { fetchContestsList } from '@/lib/api/contest/contest';
import { ContestsParams } from '@/features/contest/types/contest-request';

interface UseContestsProps {
  params: ContestsParams; // sortType, categoryIdList, page, size
  keyword?: string; // 검색어 (optional)
}

export function useContests({ params, keyword }: UseContestsProps) {
  const body = {
    keyword: keyword?.trim() || null,
  };

  return useQuery({
    queryKey: [
      'contests',
      params.sortType,
      params.page,
      params.size,
      JSON.stringify(params.categoryIdList),
      body.keyword,
    ],
    queryFn: () => fetchContestsList(params, body),
    staleTime: 1000 * 60 * 2, // 2분간 신선한 데이터로 취급
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
  });
}
