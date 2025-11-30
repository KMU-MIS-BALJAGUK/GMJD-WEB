//src/hooks/team/useMyAppliedList.ts

import { useQuery } from "@tanstack/react-query";
import { fetchMyAppliedList } from "@/lib/api/team/team";
import { MyApplyItemDto } from "@/features/team/types/MyApplyListResponse";

export function useMyAppliedList() {
  return useQuery<MyApplyItemDto[], Error>({
    queryKey: ["myAppliedList"],
    queryFn: fetchMyAppliedList,
    staleTime: 1000 * 60 * 5,
  });
}
