'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ChatMessageDTO } from '@/features/chat/type/chatMessage';
import SockJS from 'sockjs-client';
import { Client, IMessage, IFrame } from '@stomp/stompjs';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';

export function useChatSocket(roomId: number | null) {
  const stompClientRef = useRef<Client | null>(null);
  const queryClient = useQueryClient();
  const { data: userProfile } = useUserProfile();

  useEffect(() => {
    if (!roomId) return;

    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      console.warn('No access token found');
      return;
    }

    // SockJS 연결 설정
    const socket = new SockJS('https://dev.gmjd.site/ws/chat');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClientRef.current = stompClient;

    stompClient.onConnect = (frame: IFrame) => {
      console.log('STOMP CONNECTED:', frame);

      // 채팅방 구독
      stompClient.subscribe(`/topic/chat.room/${roomId}`, (message: IMessage) => {
        try {
          const chatMessage: ChatMessageDTO = JSON.parse(message.body);
          console.log('STOMP MESSAGE:', chatMessage);

          // React Query 캐시에 메시지 추가
          queryClient.setQueryData(['chat-messages', roomId], (oldData: any) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              pages: oldData.pages.map((page: any, idx: number) => {
                if (idx === oldData.pages.length - 1) {
                  return {
                    ...page,
                    data: {
                      ...page.data,
                      messages: [...page.data.messages, chatMessage],
                    },
                  };
                }
                return page;
              }),
            };
          });

          // 채팅룸 리스트의 마지막 메시지 정보도 업데이트
          queryClient.setQueryData(['chatRoomList'], (oldData: any) => {
            if (!oldData) return oldData;

            return oldData.map((room: any) => {
              if (room.chatroomId === roomId) {
                // 팀 멤버 정보에서 현재 메시지 보낸 사람의 이름 찾기
                const currentChatData = queryClient.getQueryData(['chat-messages', roomId]) as any;
                const teamMembers = currentChatData?.pages?.[0]?.data?.teamMembers ?? [];
                const sender = teamMembers.find((m: any) => m.userId === chatMessage.userId);
                const isMyMessage = sender?.userName === userProfile?.name;

                return {
                  ...room,
                  lastChatInfo: {
                    ...room.lastChatInfo,
                    lastMessage: chatMessage.message,
                    lastMessageAt: chatMessage.createdAt,
                    // 본인이 보낸 메시지가 아닐 때만 unReadMessageCount 증가
                    unReadMessageCount: isMyMessage
                      ? room.lastChatInfo.unReadMessageCount
                      : (room.lastChatInfo.unReadMessageCount || 0) + 1,
                  },
                };
              }
              return room;
            });
          });
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
    };

    stompClient.onStompError = (frame: IFrame) => {
      console.error('STOMP ERROR:', frame);
    };

    stompClient.onDisconnect = () => {
      console.log('STOMP DISCONNECTED');
    };

    // 연결 시작
    stompClient.activate();

    // cleanup
    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.deactivate();
      }
    };
  }, [roomId, queryClient]);

  // 메시지 전송 함수
  const sendMessage = useCallback(
    (text: string) => {
      if (!stompClientRef.current?.connected) {
        console.warn('STOMP client not connected');
        return;
      }

      stompClientRef.current.publish({
        destination: `/app/chat.room.${roomId}`,
        body: JSON.stringify({ message: text }),
        headers: {
          'content-type': 'application/json',
        },
      });

      console.log('MESSAGE SENT:', text);
    },
    [roomId]
  );

  return { sendMessage };
}
