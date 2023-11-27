import { produce } from 'immer';
import React from 'react';

type Room = { name: string; id: string; timestamp: Date; count: number; createdby: string };
type SerializedRoom = {
  name: string;
  id: string;
  timestamp: string;
  count: number;
  createdby: string;
};

type ChatterboxState = {
  rooms: Room[];
};
type ChatterboxAction =
  | {
      type: 'add-room';
      payload: SerializedRoom;
    }
  | { type: 'set-rooms'; payload: SerializedRoom[] };

const chatglobalReducer: React.Reducer<ChatterboxState, ChatterboxAction> = function (
  prev,
  action
) {
  switch (action.type) {
    case 'add-room': {
      const data = action.payload;
      return produce(prev, (df) => {
        df.rooms.push({
          id: data.id,
          count: data.count,
          createdby: data.createdby,
          name: data.name,
          timestamp: new Date(data.timestamp),
        });
      });
    }

    case 'set-rooms': {
      return produce(prev, (df) => {
        df.rooms = action.payload.map((d) => ({
          id: d.id,
          count: d.count,
          createdby: d.createdby,
          name: d.name,
          timestamp: new Date(d.timestamp),
        }));
      });
    }

    default:
      return prev;
  }
};

const ChatGlobalContext = React.createContext<
  null | [ChatterboxState, React.Dispatch<ChatterboxAction>]
>(null);
export const ChatterboxGlobalProvider = function (props: { children: React.ReactNode }) {
  const ctx = React.useReducer(chatglobalReducer, { rooms: [] });
  return <ChatGlobalContext.Provider value={ctx}>{props.children}</ChatGlobalContext.Provider>;
};

const useChatterboxContext = function () {
  const ctx = React.useContext(ChatGlobalContext);
  if (!ctx) {
    throw new Error('You can only use this with <ChatterboxGlobalProvider />');
  }

  return ctx;
};

export const useRooms = function () {
  const [state] = useChatterboxContext();
  return state.rooms;
};

export const useDispatcher = function () {
  const [, dispatch] = useChatterboxContext();
  return dispatch;
};
