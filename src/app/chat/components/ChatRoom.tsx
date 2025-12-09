'use client';

import Input from '@/components/common/Input';
import { formatDateOnly, formatTimeOnly } from '@/lib/utils';
import { ChevronLeft, CircleArrowUp, MessageSquareDashed, UsersRound } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PlayerInfoPopup from '@/components/popup/my-recruit/PlayerInfoPopup';
import { useChatMessages } from '@/hooks/chat/useChatMessages';
import { ChatMessageDTO } from '@/features/chat/type/chatMessage';
import { ChatRoomDTO } from '@/features/chat/type/chatResponse';
import { useChatSocket } from '@/hooks/chat/useChatSocket';
import { useUserProfile } from '@/hooks/mypage/useUserProfile';

const ChatRoom = ({
  roomInfo,
  selectedRoom,
  setShowChatRoom,
}: {
  roomInfo: ChatRoomDTO;
  selectedRoom: number | null;
  setShowChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const { sendMessage } = useChatSocket(selectedRoom); // 웹소켓 구독 및 훅 가져오기
  const { data: userProfile } = useUserProfile();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatMessages(selectedRoom);

  // 메시지를 정상 순서로 표시 (최신 메시지가 아래로)
  const messages = data?.pages?.flatMap((p) => p.data.messages) ?? [];

  const teamMembers = data?.pages?.[0]?.data.teamMembers ?? [];

  // 새 메시지가 추가되면 스크롤을 아래로
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    setOpenInfo(true);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* 헤더 */}
      <div className="w-full h-[76px] bg-white rounded-t-2xl flex gap-3 items-center px-2 py-2 md:pl-5">
        <ChevronLeft
          size={24}
          className="text-text-03 cursor-pointer md:hidden"
          onClick={() => {
            setShowChatRoom(false);
            router.replace('/chat');
          }}
        />
        <Image
          src={roomInfo.contestInfo.imageUrl}
          alt={roomInfo.contestInfo.contestName}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />
        <div>
          <p className="font-medium text-[14px]">{roomInfo.contestInfo.contestName}</p>
          <div className="text-text-03 flex items-center gap-0.5 text-[14px] mt-0.5">
            <UsersRound size={16} />
            <p>{roomInfo.teamMemberCount}</p>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="px-5 py-8 flex-1 overflow-y-auto flex flex-col">
        {isLoading && <div className="flex items-center justify-center h-full">로딩중…</div>}

        {!isLoading && hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full py-2 text-gray-500 text-sm hover:text-gray-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? '불러오는 중...' : '이전 메시지 더 불러오기 ↑'}
          </button>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquareDashed size={48} className="mx-auto mb-4 text-text-03" />
              <p className="text-text-03 text-lg font-medium mb-1">아직 메시지가 없어요</p>
              <p className="text-text-03 text-sm">팀원들과 첫 메시지를 나눠보세요!</p>
            </div>
          </div>
        )}

        {!isLoading &&
          messages.length > 0 &&
          messages.map((msg: ChatMessageDTO, idx) => {
            const sender = teamMembers.find((m) => m.userId === msg.userId);
            const isMine = sender?.userName === userProfile?.name;

            return (
              <div key={`${msg.roomId}-${msg.userId}-${idx}`}>
                {!isMine ? (
                  <div className="flex gap-3 items-start mb-3">
                    <Image
                      src={sender?.userProfileUrl || msg.profileImageUrl || '/profile-image.png'}
                      alt={sender?.userName || 'User'}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full cursor-pointer object-cover"
                      onClick={() => handleUserClick(msg.userId)}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-[13px] text-text-01">{sender?.userName || '알 수 없음'}</p>
                      <div className="flex gap-2 items-end">
                        <span className="text-[14px] px-2.5 py-2 bg-white rounded-lg max-w-[300px] break-words">
                          {msg.message}
                        </span>
                        <div className="text-[10px] text-text-03 whitespace-nowrap">
                          <p>{formatDateOnly(msg.createdAt)}</p>
                          <p>{formatTimeOnly(msg.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 items-end justify-end mb-2">
                    <div className="text-[10px] text-text-03 flex flex-col items-end whitespace-nowrap">
                      <p>{formatDateOnly(msg.createdAt)}</p>
                      <p>{formatTimeOnly(msg.createdAt)}</p>
                    </div>
                    <span className="text-white text-[14px] px-2.5 py-2 bg-blue rounded-lg max-w-[300px] break-words">
                      {msg.message}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 */}
      <div className="w-full h-[60px] bg-white px-4 py-2 rounded-b-2xl">
        <Input
          placeholder="메시지를 입력해주세요"
          variant="chat"
          className="flex-1 min-w-0"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              sendMessage(inputValue);
              setInputValue('');
            }
          }}
          icon={
            <button
              onClick={() => {
                sendMessage(inputValue);
                setInputValue('');
              }}
              className="flex items-center justify-center cursor-pointer"
            >
              <CircleArrowUp size={28} className="text-white" />
            </button>
          }
        />
      </div>

      <PlayerInfoPopup open={openInfo} setOpen={setOpenInfo} />
    </div>
  );
};

export default ChatRoom;
