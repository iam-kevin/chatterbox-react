export type TIncomingServerMessage = {
  type: 'message' | 'create-room' | 'leave-room' | 'join-room';
  message: string;
  timestamp: string;
  onlyme: boolean | null;
  rid: string | null;
  uid: string;
};

// shape of outgoing message from the server
export type TOutgoingServerMessage = {
  room?: string;
  pin?: string;
  message: string;
  senderId: string;
};
