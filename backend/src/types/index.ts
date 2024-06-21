/* eslint-disable prettier/prettier */
export type Friend = {
  id: string;
  nick: string;
  mainRole: string;
  rank: string;
  chatId: string;
  messages: string[];
}

export type FriendRequest = {
  id: string;
  nick: string;
  mainRole: string;
  rank: string;
}

export type DataMessage = {
  sender: string,
  text: string,
  time: string
}