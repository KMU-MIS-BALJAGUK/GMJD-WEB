'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ChatMessageDTO } from '@/features/chat/type/chatMessage';
import SockJS from 'sockjs-client';
import { Client, IMessage, IFrame } from '@stomp/stompjs';

export function useChatSocket(roomId: number | null) {
  const stompClientRef = useRef<Client | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) return;

    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      console.warn('No access token found');
      return;
    }

    // SockJS 연결 설정
    const socket = new SockJS('http://dev.gmjd.site/ws/chat');
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
