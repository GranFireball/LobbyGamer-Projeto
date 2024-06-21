/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Friend, FriendRequest } from "src/types";

@Entity({name: 'player'})
export class Player {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column({name: "nick"})
  nick: string;

  @Column()
  password: string;

  @Column()
  mainRole: string;

  @Column()
  rank: string;

  @Column({type: "simple-array"})
  friendRequestsSent: string[] = [];

  @Column({type: "json"})
  friendRequestsReceived: FriendRequest[] = [];

  @Column({type: "json"})
  friends: Friend[] = [];
}
