import React from 'react';

type ChatterBoxState = {
  rooms: { name: string; id: string; createdby: string; timestamp: number }[];
};
type ChatterboxAction = { type: 'create-room' };
const chatglobalReducer: React.Reducer<ChatterBoxState, ChatterboxAction> = function (
  prev,
  action
) {
  return prev;
};

const ChatGlobalContext = React.createContext<
  null | [ChatterBoxState, React.Dispatch<ChatterboxAction>]
>(null);
export const ChatterboxGlobalProvider = function (props: { children: React.ReactNode }) {
  const ctx = React.useReducer(chatglobalReducer, { rooms: [] });
  return <ChatGlobalContext.Provider value={ctx}>{props.children}</ChatGlobalContext.Provider>;
};
