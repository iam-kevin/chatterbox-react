import { useDispatcher } from '@/context/chat-global';
import React from 'react';

/**
 * Initializes the state needed to run the demo
 * @returns
 */
export function InitializeDemoState() {
  const fn = useDispatcher();
  React.useEffect(() => {
    fn({
      type: 'set-rooms',
      payload: [
        {
          name: 'RxJS',
          count: 12,
          createdby: 'alpha-olomi',
          id: 'reactivity',
          timestamp: new Date(Date.now() - 1032121).toUTCString(),
        },
        {
          name: 'Cool Kids',
          count: 12,
          createdby: 'neicore',
          id: 'cool',
          timestamp: new Date().toUTCString(),
        },
      ],
    });
  }, [fn]);
  return null;
}
