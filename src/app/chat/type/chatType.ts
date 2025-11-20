export type RoomListItem = {
  roomId: number;
  name: string;
  members: number;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  profileImage: string;
};
