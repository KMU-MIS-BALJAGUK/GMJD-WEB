'use client';

import { useEffect, useRef, useCallback } from 'react';
import { buildStompFrame } from '@/utils/stomp';
import { useQueryClient } from '@tanstack/react-query';
import { ChatMessageDTO } from '@/features/chat/type/chatMessage';

export function useChatSocket(roomId: number | null) {
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) return;

    const token = sessionStorage.getItem('accessToken');

    // WebSocket 연결
    const ws = new WebSocket(`ws://dev.gmjd.site/ws/chat?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WS CONNECTED');

      // SUBSCRIBE 프레임 전송
      const subscribeFrame = buildStompFrame('SUBSCRIBE', {
        id: `sub-${roomId}`,
        destination: `/topic/chat.room/${roomId}`,
        ack: 'auto',
      });

      ws.send(subscribeFrame);
      console.log('SUBSCRIBE SENT:', subscribeFrame);
    };

    // 메시지 수신
    ws.onmessage = (event) => {
      const raw = event.data;
      if (!raw || typeof raw !== 'string') return;

      const jsonStart = raw.indexOf('{');
      if (jsonStart === -1) return;

      const json = raw.substring(jsonStart, raw.lastIndexOf('}') + 1);

      let message: ChatMessageDTO;
      try {
        message = JSON.parse(json);
      } catch (e) {
        console.error('JSON parse error:', e);
        return;
      }

      console.log('WS MESSAGE:', message);

      // React Query 캐시에 메시지 push
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
                  messages: [...page.data.messages, message],
                },
              };
            }
            return page;
          }),
        };
      });
    };

    ws.onerror = (e) => console.error('WS ERROR:', e);
    ws.onclose = () => console.log('WS CLOSED');

    // cleanup
    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const unsubFrame = buildStompFrame('UNSUBSCRIBE', {
          id: `sub-${roomId}`,
        });
        wsRef.current.send(unsubFrame);
        wsRef.current.close();
      }
    };
  }, [roomId]);

  // SEND 메시지 전송 함수
  const sendMessage = useCallback(
    (text: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.warn('WebSocket not connected');
        return;
      }

      const body = JSON.stringify({ message: text });

      const sendFrame = buildStompFrame(
        'SEND',
        {
          destination: `/app/chat.room.${roomId}`,
          'content-type': 'application/json',
        },
        body
      );

      wsRef.current.send(sendFrame);
      console.log('SEND SENT:', sendFrame);
    },
    [roomId]
  );

  return { sendMessage };
}
