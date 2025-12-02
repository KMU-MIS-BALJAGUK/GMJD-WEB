import { useQuery } from '@tanstack/react-query';
import { fetchMyAppliedList } from '@/lib/api/team/team';

export function useMyAppliedList() {
  return useQuery({
    queryKey: ['myAppliedList'],
    queryFn: fetchMyAppliedList,
    initialData: [],   // 안전장치
  });
}
