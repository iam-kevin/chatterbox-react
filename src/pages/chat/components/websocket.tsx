import React from 'react';

const createWs = () => new WebSocket('ws://localhost:8080/chat', []);
const init = createWs();

export function useChatWebSocket() {
  const TheWs = React.useRef<undefined | WebSocket>(init);

  React.useEffect(() => {
    console.log('setting this up');
    if (TheWs.current) {
      console.log('not setup');
      return;
    }

    console.log('building this thing');

    const ws = init;
    TheWs.current = init;

    ws.onopen = () => {
      console.log('made chat connection');
    };

    return () => ws.close();
  }, []);

  return TheWs.current;
}
