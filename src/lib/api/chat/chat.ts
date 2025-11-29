import { ChatRoomListResponse } from '@/features/chat/type/chatResponse';
import api from '@/lib/axios';

export const getChatRoomList = async (): Promise<ChatRoomListResponse['data']['chatRooms']> => {
  const res = await api.get<ChatRoomListResponse>('/api/v1/chat/rooms');

  return res.data.data.chatRooms;
};
