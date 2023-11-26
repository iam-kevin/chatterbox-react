/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { CHATS_DATA } from './mock-data';

export type ChatRoomState = {
  name: string;
  members: { username: string; name: string }[];
  chats: { text: string; username: string; timestamp: number }[];
};

type Options = {
  name: string;
};
const createInitialChatRoom = (opts: Options): ChatRoomState => ({
  name: opts.name,
  members: [],
  chats: CHATS_DATA,
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
export type ChatRoomAction = { type: 'send-message'; payload: { text: string } };
export const chatReducer: React.Reducer<ChatRoomState, ChatRoomAction> = function (prev, action) {
  switch (action.type) {
    case 'send-message': {
      return prev;
    }
  }

  return prev;
};

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

export const useChatRoom = function () {
  const [state] = useChatRoomContext();
  return;
};
