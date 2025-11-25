import { fetchContestList } from '@/lib/api/contest/contest';
import { ContestFilterParams, ContestItemDto } from '@/types/contest';
import { useQuery } from '@tanstack/react-query';

export const useFilteredContests = (
  params: ContestFilterParams,
  initialData?: ContestItemDto[] // 초기 데이터 옵션
) => {
  return useQuery({
    queryKey: ['contestList', params],
    queryFn: () => fetchContestList(params),
    staleTime: 1000 * 60 * 5,
    initialData,
  });
};
