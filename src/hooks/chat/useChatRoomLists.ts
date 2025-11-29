import { ChatRoomDTO } from '@/features/chat/type/chatResponse';
import { getChatRoomList } from '@/lib/api/chat/chat';
import { useQuery } from '@tanstack/react-query';

export const useChatRoomList = () => {
  return useQuery<ChatRoomDTO[]>({
    queryKey: ['chatRoomList'],
    queryFn: getChatRoomList,
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
