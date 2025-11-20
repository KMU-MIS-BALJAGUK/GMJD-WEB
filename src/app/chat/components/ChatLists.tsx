import { cn, formatChatTime } from '@/lib/utils';
import React from 'react';
import { RoomListItem } from '../type/chatType';

const ChatLists = ({
  selectedRoom,
  setSelectedRoom,
  showChatRoom,
  setShowChatRoom,
  roomList,
}: {
  selectedRoom: number | null;
  setSelectedRoom: (roomId: number) => void;
  showChatRoom: boolean;
  setShowChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
  roomList: RoomListItem[];
}) => {
  return (
    <div
      className={cn(
        'md:max-w-[400px] w-full h-[98%] md:h-[90%] flex flex-col max-md:py-5 gap-3 md:gap-8',
        showChatRoom && 'max-md:hidden'
      )}
    >
      <p className="max-md:text-xl text-2xl font-bold">채팅</p>
      <div className="w-full h-full border border-border-01 rounded-2xl">
        {roomList.map((room, index) => (
          <div
            key={room.roomId}
            className={cn(
              'flex items-center gap-3 p-4 cursor-pointer hover:bg-bg-02 transition duration-300',
              index == 0 && 'rounded-t-2xl',
              selectedRoom === room.roomId && 'bg-bg-02'
            )}
            onClick={() => {
              setSelectedRoom(room.roomId);
              setShowChatRoom(true);
            }}
          >
            <img src={room.profileImage} alt={room.name} className="w-12 h-12 rounded-full" />
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[75%]">
                <div className="flex gap-2 items-center">
                  <p className="font-medium text-[14px] line-clamp-1">{room.name}</p>
                  <p className="text-[13px] text-text-04">{room.members}</p>
                </div>
                <p className="text-sm text-text-02 line-clamp-2">{room.lastMessage}</p>
              </div>

              <div className="flex flex-col items-end justify-between py-1">
                <p className="text-[11px] text-text-03">{formatChatTime(room.lastMessageAt)}</p>
                {room.unreadCount > 0 && (
                  <span className="bg-volcano text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                    {room.unreadCount}
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
