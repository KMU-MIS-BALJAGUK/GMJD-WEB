// 구독했을 때 들어오는 메시지 타입
export interface ChatMessageDTO {
  roomId: number;
  message: string;
  userId: number;
  createdAt: string;
  profileImageUrl: string;
}

export interface TeamMember {
  userId: number;
  userName: string;
  userProfileUrl: string;
}

// 메시지 전송할 때 사용하는 타입
export interface ChatRoomResponse {
  code: number;
  msg: string;
  data: {
    roomId: number;
    messages: ChatMessageDTO[];
    teamMembers: TeamMember[];
    lastMessageId: number;
    lastMessageAt: string;
    hasNext: boolean;
  };
}
