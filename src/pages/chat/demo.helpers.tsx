import { useRoomDispatcher } from '@/context/chat-global';
import React from 'react';

// const useChatRoomsEvents = () => {};

/**
 * Initializes the state needed to run the demo
 * @returns
 */
export function InitializeDemoState() {
  // const fn = useRoomDispatcher();
  // React.useEffect(() => {
  //   fn({
  //     type: 'set-rooms',
  //     payload: [
  //       {
  //         name: 'RxJS',
  //         count: 12,
  //         createdby: 'alpha-olomi',
  //         id: 'reactivity',
  //         timestamp: new Date(Date.now() - 1032121).toUTCString(),
  //       },
  //       {
  //         name: 'Cool Kids',
  //         count: 12,
  //         createdby: 'neicore',
  //         id: 'cool',
  //         timestamp: new Date().toUTCString(),
  //       },
  //     ],
  //   });
  // }, [fn]);
  const dispatch = useRoomDispatcher();
  React.useEffect(() => {
    const sse = new EventSource(`${import.meta.env.VITE_APP_URL}/events?stream=rooms`, {
      withCredentials: false,
    });

    sse.onopen = () => {
      console.log('made connection');
    };

    sse.onmessage = function (ev) {
      const vals = JSON.parse(ev.data) as {
        room_name: string;
        owner_nickname: string;
        room_id: string;
        timestamp: string;
      }[];

      dispatch({
        type: 'set-rooms',
        payload: vals.map((s) => ({
          count: 0,
          createdby: s.owner_nickname,
          name: s.room_name,
          id: s.room_id,
          timestamp: s.timestamp,
        })),
      });
    };

    return () => {
      sse.close();
    };
  }, [dispatch]);
  return null;
}
