import { fetchContestList } from '@/lib/api/contest/contest';
import { ContestFilterParams } from '@/features/contest/types/contest-request';
import { useQuery } from '@tanstack/react-query';

export const useFilteredContests = (
  params: ContestFilterParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['contestList', params],
    queryFn: () => fetchContestList(params),
    staleTime: 1000 * 60 * 5,
    enabled: options?.enabled ?? true,
  });
};
