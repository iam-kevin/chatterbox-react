import React from 'react';
import { TOutgoingServerMessage } from '../data';

export function ChatRoomTextArea({
  roomId,
  uid,
  ws,
}: {
  roomId: string;
  uid: string;
  ws: WebSocket | undefined;
}) {
  //   React.useEffect(() => {
  //     if (!ws) return;

  //     console.log('WEBSOCKEOTTTTO');
  //     //
  //   }, [ws]);
  const [text, set] = React.useState('');

  const onSubmit = React.useCallback(() => {
    if (!ws) {
      console.log('nothing here...', ws);
      return;
    }
    if (!ws.OPEN) {
      console.log('cant send... connection closed...');
      return;
    }

    console.log('sending...');

    const msg: TOutgoingServerMessage = {
      message: text,
      senderId: uid,
      room: roomId,
    };

    ws.send(JSON.stringify(msg));

    set('');
  }, [ws, uid, text, roomId]);

  return (
    <div className="flex items-start border-t pt-3">
      <div className="flex-shrink-0 px-4">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={`https://avatar.vercel.sh/${uid}`}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="border-b border-gray-200 focus-within:border-indigo-600">
            <textarea
              rows={3}
              name="comment"
              onChange={(e) => set(e.target.value)}
              value={text}
              id="comment"
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
            />
          </div>
          <div className="flex justify-between py-2 pr-2">
            {/* <div className="flex items-center space-x-5">
              <label className="text-sm text-gray-600">Message</label>
            </div> */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex items-center rounded-full bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
