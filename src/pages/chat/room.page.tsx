import { ChatRoomProvider, useChatRoomContext, useChats } from '@/context/chatroom';
import { useSessionInitialization, useSessionUser } from '@/lib/app/session';
import { ChatLayout } from '@/ui/layout/chat';
import { cn } from '@/ui/style-utils';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ChatRoomTextArea } from './components/chat-area';
import { useChatWebSocket } from './components/websocket';
import { TIncomingServerMessage } from './data';

const ChatRoomList = function (props: { className: string }) {
  const chats = useChats();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight + 10;
  }, []);

  return (
    <div className={cn(props.className)} ref={ref}>
      <div className="flex h-full flex-col px-3 py-2">
        <div className="flex-1" />
        {chats.map((c, ix) => (
          <div key={ix} className="flex flex-row gap-2">
            <label className="whitespace-nowrap font-medium text-purple-900">{c.username}:</label>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function ChatRoomMessageSink({ roomId, ws }: { roomId: string; ws: WebSocket | undefined }) {
  const [_, fn] = useChatRoomContext();
  React.useEffect(() => {
    if (!ws) return;

    ws.onmessage = function (ev) {
      ev.data
        .text()
        .then((text: string) => JSON.parse(text))
        .then((msg: TIncomingServerMessage) => {
          // sending for all message types
          if (roomId === msg.rid) {
            fn({
              type: 'write-message',
              payload: {
                text: msg.message,
                timestamp: new Date(msg.timestamp).getTime(),
                username: msg.uid,
              },
            });
          }
        });
    };

    return () => {
      ws.removeEventListener('message', () => {});
    };
  }, [ws, roomId, fn]);

  return null;
}

export default function ChatRoomPage() {
  const roomId = useParams()['rid'];
  useSessionInitialization();
  const ws = useChatWebSocket();
  const user = useSessionUser();

  if (!roomId) {
    return <>Missing room information to load</>;
  }

  return (
    <ChatRoomProvider
      data={{
        name: 'The Boys',
        id: roomId,
      }}
    >
      <ChatRoomMessageSink roomId={roomId} ws={ws} />
      <ChatLayout className="flex h-full flex-row drop-shadow">
        <ChatLayout.Main className="relative flex flex-1 flex-col rounded-l-md bg-white">
          <ChatRoomList className="flex-1 overflow-y-auto" />
          {/* chatarea */}
          <ChatRoomTextArea roomId={roomId} uid={user.nickname} ws={ws} />
        </ChatLayout.Main>
        <ChatLayout.Aside className="w-1/3 flex-col divide-y divide-orange-500 rounded-r-md bg-orange-200 md:flex">
          <div className="flex-1 px-3 py-4">
            <h2 className="text-xl font-bold">Members</h2>
          </div>
          <div className="space-y-3 px-3 py-4">
            <h2 className="text-xl font-bold">Instructions</h2>
            <div>
              <p>
                You can send message from{' '}
                <code className="whitespace-nowrap rounded-md bg-orange-300 px-2 py-0.5 text-sm text-orange-700">
                  {'/send <username> <amount>'}
                </code>
              </p>
            </div>
          </div>
        </ChatLayout.Aside>
      </ChatLayout>
    </ChatRoomProvider>
  );
}
