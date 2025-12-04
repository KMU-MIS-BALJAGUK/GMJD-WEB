// 지원자를 승인하는 React Query mutation

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  acceptRecruitApplicant,
  closeRecruitTeam,
  fetchMyRecruitList,
} from '@/lib/api/team/team';
import { useCreateChatRoom } from '@/hooks/chat/useCreateChatRoom';

export function useAcceptRecruitApplicant() {
  const queryClient = useQueryClient();

  const createChatRoom = useCreateChatRoom();

  return useMutation<unknown, Error, { teamId: number; applicantUserId: number }>({
    mutationFn: ({ teamId, applicantUserId }) => acceptRecruitApplicant(teamId, applicantUserId),
    onSuccess: async (_data, variables) => {
      const { teamId, applicantUserId } = variables;

      queryClient.invalidateQueries({ queryKey: ['recruitApplicants', teamId] });
      queryClient.invalidateQueries({ queryKey: ['recruitApplicantDetail', teamId, applicantUserId] });

      // 최신 팀 모집 정보를 받아온 뒤 정원이 찼다면 자동 마감
      const latestTeams = await queryClient.fetchQuery({
        queryKey: ['myRecruitTeams'],
        queryFn: fetchMyRecruitList,
      });

        const team = latestTeams.find((item) => item.teamId === teamId);
        const isOpen = team?.status === '모집중';
        const isFull = team ? team.memberCount >= team.maxMember : false;

      if (team && isOpen && isFull) {
        await closeRecruitTeam(teamId);
        try {
          createChatRoom.mutate({ teamId });
        } catch (err) {
          console.error('create chat room failed after auto-close', err);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['myRecruitTeams'] });
      queryClient.invalidateQueries({ queryKey: ['teamDetail', teamId] });
    },
  });
}
