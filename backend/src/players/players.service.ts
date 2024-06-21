/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { v4 as uuidv4} from 'uuid';
import { DataMessage } from 'src/types';
import * as bcrypt from "bcrypt";
import * as crypto from "crypto-js";

const nullPlayer = {
  nick: ""
}

function encrypt(message: DataMessage){
  const encriptedMessage = crypto.AES.encrypt(JSON.stringify(message), process.env.SECRET_KEY_CRYPTO).toString();
  return encriptedMessage;
}

function decrypt(messages: string[]){
  const decryptedMessages = [];
  for(const message of messages){
    const bytes  = crypto.AES.decrypt(message, process.env.SECRET_KEY_CRYPTO);
    const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
    decryptedMessages.push(decryptedData);
  }
  return decryptedMessages;
} 

async function findAllPlayers(playerRepository: Repository<Player>){
  const allPlayers = await playerRepository.find();
  return allPlayers;
}

function removeLoggedPlayerFromAllPlayersList(players: Player[], id: string){
  return players.filter((player) => player.id !== id);
}

function isInFriendRequestsSendList(player: Player, otherPlayer: Player){
  for(const idFriendRequestSent of player.friendRequestsSent)
    if(otherPlayer.id === idFriendRequestSent){
      return true;
    }
  return false;
}


function isInFriendRequestsReceivedList(player: Player, otherPlayer: Player){
  for(const friendRequestReceived of player.friendRequestsReceived)
    if(otherPlayer.id === friendRequestReceived.id){
      return true;
    }
  return false;
}

function isInFriendsList(player: Player, otherPlayer: Player){
  for(const friend of player.friends)
    if(otherPlayer.id === friend.id){
      return true;
    }
  return false;
}

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ){}

  async create(createPlayerDto: CreatePlayerDto) {
    const player = await this.playerRepository.findOneBy({nick: createPlayerDto.nick});
    if(player){
      return nullPlayer;
    }
    createPlayerDto.password = bcrypt.hashSync(createPlayerDto.password, 8);
    return await this.playerRepository.save(createPlayerDto);
  }

  async findPlayers(id: string) {
    const player = await this.playerRepository.findOneBy({id});
    const allPlayers = await findAllPlayers(this.playerRepository);
    const allPlayersExceptLoggedPlayer = removeLoggedPlayerFromAllPlayersList(allPlayers, id);
    const players = allPlayersExceptLoggedPlayer.filter((otherPlayer) => {
      if(isInFriendRequestsSendList(player, otherPlayer)){
        return;
      }
      if(isInFriendRequestsReceivedList(player, otherPlayer)){
        return;
      }
      if(isInFriendsList(player, otherPlayer)){
        return;
      }
      return player;
    })
    return players;
  }

  async friendRequestsReceived(id: string) {
    const player = await this.playerRepository.findOneBy({id});
    return player.friendRequestsReceived;
  }

  async friends(id: string) {
    const player = await this.playerRepository.findOneBy({id});
    for(const i in player.friends){
      player.friends[i].messages = decrypt(player.friends[i].messages);
    }
    return player.friends;
  }

  async loginPlayer(nick: string, password: string) {
    const player = await this.playerRepository.findOneBy({nick: nick});
    if(player && bcrypt.compareSync(password, player.password)){
      return player;
    }
    return nullPlayer;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playerRepository.findOneBy({id});
    if(!player){
      throw new NotFoundException("Player Not Found");
    }
    return await this.playerRepository.update(id, updatePlayerDto)
  }


  async addFriendRequest(id1: string, id2: string) {
    const player1 = await this.playerRepository.findOneBy({id: id1});
    const player2 = await this.playerRepository.findOneBy({id: id2});
    if(!player1 || !player2){
      throw new NotFoundException("Player Not Found");
    }
    player1.friendRequestsSent.push(id2);
    player2.friendRequestsReceived.push({id: player1.id, nick: player1.nick, mainRole: player1.mainRole, rank: player1.rank});

    await this.playerRepository.update(id1, player1);
    await this.playerRepository.update(id2, player2);
    return;
  }

  async addFriend(id1: string, id2: string) {
    const player1 = await this.playerRepository.findOneBy({id: id1});
    const player2 = await this.playerRepository.findOneBy({id: id2});
    if(!player1 || !player2){
      throw new NotFoundException("Player Not Found");
    }
    const newChatId = uuidv4();
    player1.friends.push({id: player2.id, nick: player2.nick, mainRole: player2.mainRole, rank: player2.rank, chatId: newChatId, messages: []});
    player2.friends.push({id: player1.id, nick: player1.nick, mainRole: player1.mainRole, rank: player1.rank, chatId: newChatId, messages: []});
    const filteredFriendRequestsReceived = player1.friendRequestsReceived.filter((player) => player.id !== player2.id);
    player1.friendRequestsReceived = filteredFriendRequestsReceived;
    const filteredFriendRequestsSent = player2.friendRequestsSent.filter((idPlayer) => idPlayer !== player1.id);
    player2.friendRequestsSent = filteredFriendRequestsSent;
    await this.playerRepository.update(id1, player1);
    await this.playerRepository.update(id2, player2);
    return;
  }
  
  async removeFriendRequest(id1: string, id2: string) {
    const player1 = await this.playerRepository.findOneBy({id: id1});
    const player2 = await this.playerRepository.findOneBy({id: id2});
    if(!player1 || !player2){
      throw new NotFoundException("Player Not Found");
    }
    const filteredFriendRequestsReceived = player1.friendRequestsReceived.filter((player) => player.id !== player2.id);
    player1.friendRequestsReceived = filteredFriendRequestsReceived;
    const filteredFriendRequestsSent = player2.friendRequestsSent.filter((idPlayer) => idPlayer !== player1.id);
    player2.friendRequestsSent = filteredFriendRequestsSent;
    await this.playerRepository.update(id1, player1);
    await this.playerRepository.update(id2, player2);
    return;
  }

  async addMessage(id1: string, id2: string, chatId: string, message: DataMessage){
    const player1 = await this.playerRepository.findOneBy({id: id1});
    const player2 = await this.playerRepository.findOneBy({id: id2});
    for(const i in player1.friends){
      if(player1.friends[i].chatId === chatId){
        player1.friends[i].messages.push(encrypt(message));
        break;
      }
    }
    for(const i in player2.friends){
      if(player2.friends[i].chatId === chatId){
        player2.friends[i].messages.push(encrypt(message));
        break;
      }
    }
    await this.playerRepository.update(id1, player1);
    await this.playerRepository.update(id2, player2);
  }
}
