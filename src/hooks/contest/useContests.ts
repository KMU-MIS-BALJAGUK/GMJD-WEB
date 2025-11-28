import { useQuery } from '@tanstack/react-query';
import { fetchContestsList } from '@/lib/api/contest/contest';
import { ContestsParams } from '@/features/contest/types/contest-request';

interface UseContestsProps {
  params: ContestsParams; // sortType, categoryIds, page, size
  keyword?: string; // 검색어 (optional)
}

export function useContests({ params, keyword }: UseContestsProps) {
  const body = {
    keyword: keyword?.trim() || null,
  };

  return useQuery({
    queryKey: ['contests', params, body],
    queryFn: () => fetchContestsList(params, body),
    staleTime: 1000 * 60 * 5,
  });
}
