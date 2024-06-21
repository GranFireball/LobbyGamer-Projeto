/* eslint-disable prettier/prettier */
import { Friend, FriendRequest } from "src/types";

export class CreatePlayerDto {
  nick: string;
  password: string;
  mainRole: string;
  rank: string;
  friendRequestsSent: string[];
  friendRequestsReceived: FriendRequest[];
  friends: Friend[];
}
