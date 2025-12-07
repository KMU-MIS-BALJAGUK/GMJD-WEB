import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/categories/categories';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30, // 30분간 캐시
  });
};
