'use client';

import Input from '@/components/common/Input';
import { formatDateOnly, formatTimeOnly } from '@/lib/utils';
import { ChevronLeft, CircleArrowUp, UsersRound } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { RoomListItem } from '../type/chatType';
import { useRouter } from 'next/navigation';

const messages = [
  {
    messageId: 101,
    roomId: 1,
    sender: { id: 3, name: '오연정', avatar: '/profile-image.png' },
    text: '안녕하세요!',
    createdAt: '2025-02-18T14:21:00Z',
  },
  {
    messageId: 102,
    roomId: 1,
    sender: { id: 1, name: '나', avatar: '/users/me.png' },
    text: '반갑습니다 :)',
    createdAt: '2025-02-18T14:22:00Z',
  },
  {
    messageId: 103,
    roomId: 1,
    sender: { id: 3, name: '오연정', avatar: '/profile-image.png' },
    text: 'Text 길게 입력한 부분입니다. 두줄형태로 노출되는 영역/두줄형태로 노출되는 영역',
    createdAt: '2025-02-18T14:23:00Z',
  },
  {
    messageId: 104,
    roomId: 1,
    sender: { id: 3, name: '오연정', avatar: '/profile-image.png' },
    text: '안녕하세요!',
    createdAt: '2025-02-18T14:24:00Z',
  },
  {
    messageId: 105,
    roomId: 1,
    sender: { id: 1, name: '나', avatar: '/users/me.png' },
    text: '넵',
    createdAt: '2025-02-18T14:26:00Z',
  },
  {
    messageId: 201,
    roomId: 2,
    sender: { id: 4, name: '김민서', avatar: '/profile-image.png' },
    text: '안녕하세요! 아이디어 초안 정리해서 공유드립니다.',
    createdAt: '2025-02-17T10:12:00Z',
  },
  {
    messageId: 202,
    roomId: 2,
    sender: { id: 1, name: '나', avatar: '/users/me.png' },
    text: '확인했습니다! 너무 좋아요 :)',
    createdAt: '2025-02-17T10:14:00Z',
  },
  {
    messageId: 203,
    roomId: 2,
    sender: { id: 5, name: '정우진', avatar: '/profile-image.png' },
    text: '자료에 제안서 포맷 추가해서 드릴게요.',
    createdAt: '2025-02-17T10:16:00Z',
  },
  {
    messageId: 204,
    roomId: 2,
    sender: { id: 4, name: '김민서', avatar: '/profile-image.png' },
    text: '좋아요! 일정은 내일 오전 회의에서 조율해보죠.',
    createdAt: '2025-02-17T10:18:00Z',
  },
  {
    messageId: 205,
    roomId: 2,
    sender: { id: 1, name: '나', avatar: '/users/me.png' },
    text: '네, 준비해서 들어가겠습니다!',
    createdAt: '2025-02-17T10:19:00Z',
  },
];

const ChatRoom = ({
  roomInfo,
  selectedRoom,
  setShowChatRoom,
}: {
  roomInfo: RoomListItem;
  selectedRoom: number | null;
  setShowChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const filteredMessages = messages.filter((msg) => msg.roomId === selectedRoom);
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full">
      {/* 채팅방 정보 */}
      <div className="w-full h-[76px] bg-white rounded-t-2xl flex gap-3 items-center pl-2 md:pl-5">
        <ChevronLeft
          size={24}
          className="text-text-03 cursor-pointer md:hidden"
          onClick={() => {
            setShowChatRoom(false);
            router.replace('/chat', { scroll: false });
          }}
        />
        <Image
          src={roomInfo.profileImage}
          alt={roomInfo.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full shrink-0"
        />
        <div>
          <p className="font-medium text-[14px]">{roomInfo.name}</p>
          <div className="text-text-03 flex items-center gap-0.5 text-[14px] mt-0.5">
            <UsersRound size={16} />
            <p>{roomInfo.members}</p>
          </div>
        </div>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="px-5 py-8 flex-1">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Image src={'/messages.png'} alt="Message Example" width={88} height={61} />
            <p className="text-[14px] text-text-03">대화방을 선택해서 대화에 참여해보세요!</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div key={message.messageId}>
              {message.sender.name !== '나' ? (
                <div className="flex gap-3 items-start mb-3">
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] text-text-01">{message.sender.name}</p>
                    <div className="flex gap-2 items-end">
                      <span className="text-[14px] text-text-01 px-2.5 py-2 bg-white rounded-lg max-w-[300px]">
                        {message.text}
                      </span>
                      <div className="text-text-03 text-[10px]">
                        <p>{formatDateOnly(message.createdAt)}</p>
                        <p className="-mt-0.5">{formatTimeOnly(message.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-end justify-end">
                  <div className="text-text-03 text-[10px] flex flex-col items-end">
                    <p>{formatDateOnly(message.createdAt)}</p>
                    <p className="-mt-0.5">{formatTimeOnly(message.createdAt)}</p>
                  </div>
                  <span className="text-[14px] text-white px-2.5 py-2 bg-blue rounded-lg max-w-[300px]">
                    {message.text}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 메시지 영역 */}
      <div className="w-full h-[60px] bg-white mt-auto rounded-b-2xl px-4 flex items-center">
        <div className="flex-1">
          <Input
            placeholder="메시지를 입력해주세요"
            variant="chat"
            icon={<CircleArrowUp size={28} className="text-white fill-text-04" />}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
