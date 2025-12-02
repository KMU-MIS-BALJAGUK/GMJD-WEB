// useChatMessages.ts 수정 버전
import { ChatRoomResponse } from '@/features/chat/type/chatMessage';
import { getChatRoomMessages } from '@/lib/api/chat/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

export type ChatCursor = {
  cursorMessageId: number | null;
  cursorMessageAt: string | null;
};

export function useChatMessages(roomId: number | null) {
  return useInfiniteQuery({
    queryKey: ['chat-messages', roomId],
    enabled: !!roomId,

    initialPageParam: {
      cursorMessageId: null,
      cursorMessageAt: null,
    } as ChatCursor,

    queryFn: async ({ pageParam }: { pageParam: ChatCursor }) => {
      return getChatRoomMessages({
        roomId: roomId!,
        cursorMessageId: pageParam.cursorMessageId ?? undefined,
        cursorMessageAt: pageParam.cursorMessageAt ?? undefined,
      });
    },

    getNextPageParam: (lastPage: ChatRoomResponse) => {
      if (!lastPage.data.hasNext) return undefined;

      return {
        cursorMessageId: lastPage.data.lastMessageId,
        cursorMessageAt: lastPage.data.lastMessageAt,
      } as ChatCursor;
    },
  });
}
