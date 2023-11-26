import { ChatterboxGlobalProvider } from '@/context/chat-global';
import { ChatLayout } from '@/ui/layout/chat';
import { cn } from '@/ui/style-utils';

const ChatRoomList = function (props: { className?: string }) {
  return (
    <div className={cn(props.className)}>
      <div className="italic text-gray-500">
        <p>No rooms exist</p>
      </div>
    </div>
  );
};

export default function MainPage() {
  return (
    <ChatterboxGlobalProvider>
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
              <form action="#">
                <div className="border-gray-200 focus-within:border-indigo-600">
                  <textarea
                    rows={2}
                    name="comment"
                    id="comment"
                    className="block w-full resize-none border-0 border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400  focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Type something"
                    defaultValue={''}
                  />
                </div>
                <div className="flex justify-between py-2 pr-2">
                  <div className="flex items-center space-x-5"></div>
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
