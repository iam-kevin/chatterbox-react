/* eslint-disable react-hooks/exhaustive-deps */
import { ChatterboxGlobalProvider, useRooms } from '@/context/chat-global';
import { ChatLayout } from '@/ui/layout/chat';
import { cn } from '@/ui/style-utils';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { InitializeDemoState } from './demo.helpers';

import { AlertTriangleIcon } from 'lucide-react';

const ChatRoomList = function (props: { className?: string }) {
  const rooms = useRooms();

  return (
    <div className={cn(props.className)}>
      {rooms.length === 0 ? (
        <div className="italic text-gray-500">
          <p>No rooms exist</p>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-1 py-2">
          {rooms.map((r, ix) => (
            <div key={ix} className="flex flex-row gap-2">
              <label className="whitespace-nowrap font-medium text-orange-300">#{r.id}</label>
              <label className="whitespace-nowrap font-medium text-purple-900">{r.name}</label>
              {/* created by */}
              <div className="inline-flex flex-row items-center justify-center gap-1 rounded-full border px-2.5 py-0.5">
                <img
                  src={`https://avatar.vercel.sh/${r.createdby}`}
                  className="h-3 w-3 rounded-full bg-slate-100"
                />
                <label className="text-sm">{r.createdby}</label>
              </div>
              <div className="flex-1 flex-row-reverse text-right">
                <label className="text-sm text-gray-500">
                  Created {formatDistanceToNow(r.timestamp, { addSuffix: true })}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MAX_CHAT_INPUT = 160;
const chatTextInpuSchema = z
  .string()
  .min(1, { message: 'Please type in atleast 3 characters in the input field' })
  .max(MAX_CHAT_INPUT, { message: "That's too many characters, you shouldn't exceed the limit" });

export default function MainPage() {
  const [text, set] = React.useState('');
  const [err, setErr] = React.useState<string | null>('');

  const navigate = useNavigate();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (e) => {
      setErr(null);
      e.preventDefault();
      const out = chatTextInpuSchema.safeParse(text);
      if (!out.success) {
        console.log(out.error);
        setErr(out.error.format()._errors[0]);
        return;
      }

      // send message
      const roomId = 'cool';
      navigate(`/room/${roomId}`);
    },
    [text]
  );

  return (
    <ChatterboxGlobalProvider>
      <InitializeDemoState />
      <ChatLayout className="flex h-full flex-row justify-center drop-shadow">
        <ChatLayout.Main className="relative flex w-2/3  flex-col rounded-md bg-white">
          <div className="flex-1">
            <div className="space-y-2 px-4 py-6">
              <h2 className="text-2xl font-semibold">Available Room</h2>
              <p>Here are the rooms that have been created!</p>
            </div>
            <ChatRoomList className="flex-1 overflow-y-auto px-4" />
          </div>
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
              <form onSubmit={onSubmit}>
                <div className="border-gray-200 focus-within:border-indigo-600">
                  <textarea
                    rows={2}
                    name="comment"
                    id="comment"
                    tabIndex={0}
                    className="block w-full resize-none border-0 border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Type something like /join cool"
                    defaultValue={''}
                    value={text}
                    onChange={(e) => set(e.target.value)}
                    maxLength={MAX_CHAT_INPUT}
                  />
                </div>
                <div className="flex items-center justify-between gap-4 py-2 pr-2">
                  <label className="text-sm text-gray-400">
                    {text.length} / {MAX_CHAT_INPUT}
                  </label>
                  <div className="flex-1">
                    {err && (
                      <div className="flex flex-row items-center gap-1 ">
                        <AlertTriangleIcon className="h-auto w-4 text-red-500" />
                        <p className="truncate text-sm text-red-600">{err}</p>
                      </div>
                    )}
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
      </ChatLayout>
    </ChatterboxGlobalProvider>
  );
}
