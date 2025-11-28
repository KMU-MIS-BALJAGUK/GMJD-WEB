import {
  ContestFilterParams,
  ContestSearchKeywordDto,
} from '@/features/contest/types/contest-request';
import { searchContests } from '@/lib/api/contest/contest';
import { useQuery } from '@tanstack/react-query';

interface UseSearchContestsProps {
  params: ContestFilterParams;
  body: ContestSearchKeywordDto;
}

export function useSearchContests(
  { params, body }: UseSearchContestsProps,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ['contests', 'search', params, body],
    queryFn: () => searchContests(params, body),
    enabled: options?.enabled ?? !!body.keyword,
  });
}
