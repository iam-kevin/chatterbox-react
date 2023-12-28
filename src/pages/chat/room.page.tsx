import { ChatRoomProvider, useChats } from '@/context/chatroom';
import { useSessionInitialization } from '@/lib/app/session';
import { ChatLayout } from '@/ui/layout/chat';
import { cn } from '@/ui/style-utils';
import React from 'react';
import { useParams } from 'react-router-dom';

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

export default function ChatRoomPage() {
  const roomId = useParams()['rid'];
  useSessionInitialization();

  if (!roomId) {
    return <>Missing room information to load</>;
  }

  return (
    <ChatRoomProvider
      data={{
        name: 'kevin-james',
        id: roomId,
      }}
    >
      <ChatLayout className="flex h-full flex-row drop-shadow">
        <ChatLayout.Main className="relative flex flex-1 flex-col rounded-l-md bg-white">
          <ChatRoomList className="flex-1 overflow-y-auto" />
          {/* chatarea */}
          <div className="flex items-start border-t pt-3">
            <div className="flex-shrink-0 px-4">
              <img
                className="inline-block h-10 w-10 rounded-full"
                src="https://avatar.vercel.sh/1"
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <form action="#">
                <div className="border-b border-gray-200 focus-within:border-indigo-600">
                  <textarea
                    rows={3}
                    name="comment"
                    id="comment"
                    className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Add your comment..."
                    defaultValue={''}
                  />
                </div>
                <div className="flex justify-between py-2 pr-2">
                  <div className="flex items-center space-x-5">
                    <label className="text-sm text-gray-600">Message</label>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-full bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
