import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChatRoom } from '@/lib/api/chat/chat';
import { CreateChatRoomRequestDto } from '@/features/chat/type/chatRequest';
import { useToast } from '@/components/ui/use-toast';

interface UseCreateChatRoomOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useCreateChatRoom = (options?: UseCreateChatRoomOptions) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (body: CreateChatRoomRequestDto) => createChatRoom(body),
    onSuccess: () => {
      // 채팅방 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['chatRoomList'] });

      toast({
        title: '채팅방 생성 완료 🎉',
        description: '팀원들과 대화를 시작해보세요!',
      });

      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error('채팅방 생성 실패:', error);

      toast({
        title: '채팅방 생성 실패 🚨',
        description: '잠시 후 다시 시도해주세요.',
        variant: 'destructive',
      });

      options?.onError?.(error);
    },
  });
};
