import ChatPageClient from './components/ChatPageClient';

export default function ChatPage({ searchParams }: { searchParams: { roomId?: string } }) {
  const roomId = searchParams.roomId ? Number(searchParams.roomId) : null;

  return <ChatPageClient initialRoomId={roomId} />;
}
