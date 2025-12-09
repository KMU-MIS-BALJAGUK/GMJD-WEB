'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChatLists from './ChatLists';
import ChatRoom from './ChatRoom';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useChatRoomList } from '@/hooks/chat/useChatRoomLists';

export default function ChatPageClient({ initialRoomId }: { initialRoomId: number | null }) {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(initialRoomId);
  const [showChatRoom, setShowChatRoom] = useState(!!initialRoomId);

  // 실제 API 데이터 사용
  const { data: roomLists } = useChatRoomList();
  const rooms = roomLists ?? [];

  // URL 동기화
  const handleSelectRoom = (roomId: number) => {
    setSelectedRoom(roomId);
    setShowChatRoom(true);

    router.replace(`/chat?roomId=${roomId}`, { scroll: false });
  };

  const currentRoomInfo = rooms.find((room) => room.chatroomId === selectedRoom) ?? null;

  return (
    <div className="h-[calc(100vh-68px)] md:h-[calc(100vh-68px-80px)] flex items-center justify-center gap-5 max-md:px-4 px-6">
      {/* 리스트 */}
      <ChatLists
        selectedRoom={selectedRoom}
        setSelectedRoom={handleSelectRoom}
        showChatRoom={showChatRoom}
        setShowChatRoom={setShowChatRoom}
      />

      {/* 채팅룸 */}
      <div
        className={cn(
          'w-full md:max-w-[600px] h-[98%] md:h-[90%] border border-border-01 rounded-2xl bg-bg-01',
          !showChatRoom && 'max-md:hidden'
        )}
      >
        {selectedRoom === null || !currentRoomInfo ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Image src={'/messages.png'} alt="Message Example" width={88} height={61} />
            <p className="text-[14px] text-text-03">대화방을 선택해서 대화에 참여해보세요!</p>
          </div>
        ) : (
          <ChatRoom
            selectedRoom={selectedRoom}
            roomInfo={currentRoomInfo}
            setShowChatRoom={setShowChatRoom}
          />
        )}
      </div>
    </div>
  );
}
