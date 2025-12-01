export type ChatRoomDTO = {
  chatroomId: number;
  contestInfo: {
    contestId: number;
    teamId: number;
    contestName: string;
    imageUrl: string;
  };
  lastChatInfo: {
    lastMessage: string;
    lastMessageAt: string;
    unReadMessageCount: number;
  };
  teamMemberCount: number;
};

export type ChatRoomListResponse = {
  code: number;
  msg: string;
  data: {
    chatRooms: ChatRoomDTO[];
  };
};
