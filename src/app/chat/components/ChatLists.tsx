import { cn, formatChatTime } from '@/lib/utils';
import React from 'react';
import { useChatRoomList } from '@/hooks/chat/useChatRoomLists';
import Image from 'next/image';
import { Inbox } from 'lucide-react'; // ← 아이콘 추가
import Loading from '@/components/common/Loading';

const ChatLists = ({
  selectedRoom,
  setSelectedRoom,
  showChatRoom,
  setShowChatRoom,
}: {
  selectedRoom: number | null;
  setSelectedRoom: (roomId: number) => void;
  showChatRoom: boolean;
  setShowChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: roomLists, isLoading } = useChatRoomList();

  // API 구조에 따라 맞추기
  const rooms = roomLists ?? [];

  return (
    <div
      className={cn(
        'md:max-w-[400px] w-full h-[98%] md:h-[90%] flex flex-col max-md:py-5 gap-3 md:gap-8',
        showChatRoom && 'max-md:hidden'
      )}
    >
      <p className="max-md:text-xl text-2xl font-bold">채팅</p>

      <div className="w-full h-full border border-border-01 rounded-2xl overflow-y-auto flex flex-col">
        {/* 로딩 */}
        {isLoading && <Loading className="h-full" message="채팅방 목록을 불러오는 중..." />}

        {/* 채팅방 없을 때 */}
        {!isLoading && rooms.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-1 text-center px-4">
            <div className="p-4 bg-bg-02 rounded-full mb-2">
              <Inbox className="w-10 h-10 text-text-03" />
            </div>
            <p className="text-text-02 text-sm">아직 참여한 채팅방이 없어요</p>
            <p className="text-text-04 text-xs">새로운 공모전에 참여해 대화를 시작해보세요!</p>
          </div>
        )}

        {/* 채팅방 목록 */}
        {rooms.length > 0 &&
          rooms.map((room, index) => (
            <div
              key={room.chatroomId}
              className={cn(
                'flex items-center gap-3 p-4 cursor-pointer hover:bg-bg-02 transition duration-300',
                index === 0 && 'rounded-t-2xl',
                selectedRoom === room.chatroomId && 'bg-bg-02'
              )}
              onClick={() => {
                setSelectedRoom(room.chatroomId);
                setShowChatRoom(true);
              }}
            >
              <Image
                src={room.contestInfo.imageUrl}
                alt={room.contestInfo.contestName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full shrink-0 object-cover"
              />
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-[2px] w-[75%]">
                  <div className="flex gap-2 items-center">
                    <p className="font-medium text-[14px] line-clamp-1">
                      {room.contestInfo.contestName}
                    </p>
                    <p className="font-medium text-[13px] text-text-04">{room.teamMemberCount}</p>
                  </div>
                  <p className="text-sm text-text-02 line-clamp-2">
                    {room.lastChatInfo.lastMessage}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between py-1">
                  <p className="text-[11px] text-text-03">
                    {formatChatTime(room.lastChatInfo.lastMessageAt)}
                  </p>
                  {room.lastChatInfo.unReadMessageCount > 0 && (
                    <span className="bg-volcano text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                      {room.lastChatInfo.unReadMessageCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatLists;
