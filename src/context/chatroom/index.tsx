/* eslint-disable react-refresh/only-export-components */
import React from 'react';

import { produce } from 'immer';

type ChatMessage = { text: string; username: string; timestamp: number };
export type ChatRoomState = {
  id: string;
  name: string;
  members: { username: string; name: string }[];
  chats: ChatMessage[];
};

type Options = {
  id: string;
  name: string;
};
const createInitialChatRoom = (opts: Options): ChatRoomState => ({
  id: opts.id,
  name: opts.name,
  members: [],
  // chats: CHATS_DATA,
  chats: [],
});

const ChatRoomContext = React.createContext<[ChatRoomState, React.Dispatch<ChatRoomAction>] | null>(
  null
);
export const ChatRoomProvider = function (props: { data: Options; children: React.ReactNode }) {
  const ctx = React.useReducer(chatReducer, createInitialChatRoom(props.data));
  return <ChatRoomContext.Provider value={ctx}>{props.children}</ChatRoomContext.Provider>;
};

/*
 * --------------------------------------
 * Reducer
 * --------------------------------------
 */
export type ChatRoomAction =
  | { type: 'write-message'; payload: ChatMessage }
  | { type: 'set-messages'; payload: ChatMessage[] };

export const chatReducer: React.Reducer<ChatRoomState, ChatRoomAction> = function (prev, action) {
  switch (action.type) {
    case 'write-message': {
      return produce(prev, (df) => {
        df.chats.push(action.payload);
      });
    }
    case 'set-messages': {
      return produce(prev, (df) => {
        df.chats = action.payload;
      });
    }
    default:
      return prev;
  }
};

/*
 * --------------------------------------
 * Hooks
 * --------------------------------------
 */
export const useChatRoomContext = function () {
  const ctx = React.useContext(ChatRoomContext);
  if (ctx === null) {
    throw new Error('You must use this inside <ChatRoomProvider />');
  }

  return ctx;
};

export const useChats = function () {
  const [state] = useChatRoomContext();
  return state.chats;
};
