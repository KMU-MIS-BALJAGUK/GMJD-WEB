'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChatLists from './ChatLists';
import ChatRoom from './ChatRoom';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const roomList = [
  {
    roomId: 1,
    name: 'NH농협카드 플레이트&스티커 디자인 콘테스트',
    members: 12,
    lastMessage:
      '감사합니다! 다음주에 줌미팅에서 더 자세히 얘기해보면 좋을 것 같아요! 주말 잘 보내시기바랍니다!',
    lastMessageAt: '2025-11-19T11:07:00Z',
    unreadCount: 3,
    profileImage: '/contest_example.png',
  },
  {
    roomId: 2,
    name: '제3회 기아 PBV 아이디어 공모전',
    members: 5,
    lastMessage: '좋아요! 주말 잘 보내시기바랍니다!',
    lastMessageAt: '2025-11-14T09:55:00Z',
    unreadCount: 0,
    profileImage: '/contest_example.png',
  },
  {
    roomId: 3,
    name: '2024 대학 광고동아리 광고제',
    members: 5,
    lastMessage: '내일 10시에 회의 시작할게요.',
    lastMessageAt: '2025-11-18T14:32:00Z',
    unreadCount: 0,
    profileImage: '/contest_example.png',
  },
];

export default function ChatPageClient({ initialRoomId }: { initialRoomId: number | null }) {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(initialRoomId);
  const [showChatRoom, setShowChatRoom] = useState(false);

  // URL 동기화
  const handleSelectRoom = (roomId: number) => {
    setSelectedRoom(roomId);
    setShowChatRoom(true);

    router.replace(`/chat?roomId=${roomId}`, { scroll: false });
  };

  const currentRoomInfo = roomList.find((room) => room.roomId === selectedRoom) ?? null;

  return (
    <div className="h-[calc(100vh-68px)] md:h-[calc(100vh-68px-80px)] flex items-center justify-center gap-5 max-md:px-4 px-6">
      {/* 리스트 */}
      <ChatLists
        selectedRoom={selectedRoom}
        setSelectedRoom={handleSelectRoom}
        showChatRoom={showChatRoom}
        setShowChatRoom={setShowChatRoom}
        roomList={roomList}
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
