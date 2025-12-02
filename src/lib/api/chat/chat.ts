import { ChatRoomResponse } from '@/features/chat/type/chatMessage';
import { ChatRoomListResponse } from '@/features/chat/type/chatResponse';
import api from '@/lib/axios';

export const getChatRoomList = async (): Promise<ChatRoomListResponse['data']['chatRooms']> => {
  const res = await api.get<ChatRoomListResponse>('/api/v1/chat/rooms');

  return res.data.data.chatRooms;
};

export async function getChatRoomMessages(params: {
  roomId: number;
  cursorMessageId?: number;
  cursorMessageAt?: string;
  size?: number;
}): Promise<ChatRoomResponse> {
  const { roomId, cursorMessageId, cursorMessageAt, size = 30 } = params;

  const query = new URLSearchParams();
  if (cursorMessageId) query.append('cursorMessageId', String(cursorMessageId));
  if (cursorMessageAt) query.append('cursorMessageAt', cursorMessageAt);
  if (size) query.append('size', String(size));

  const res = await api.get<ChatRoomResponse>(`/api/v1/chat/${roomId}?${query.toString()}`);
  return res.data;
}
