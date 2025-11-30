import ChatPageClient from './components/ChatPageClient';

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ roomId?: string }>;
}) {
  const params = await searchParams;

  const roomId = params.roomId ? Number(params.roomId) : null;

  return <ChatPageClient initialRoomId={roomId} />;
}
