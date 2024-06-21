/* eslint-disable prettier/prettier */
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PlayersService } from './players/players.service';

type DataMessage = {
  sender: string,
  text: string,
  time: string
}

type Message = {
  chatId: string,
  message: DataMessage,
  from: string,
  to: string;
}

@WebSocketGateway({cors: true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway'); 

  constructor(
    private readonly playersService: PlayersService
  ){}

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: Message): void {
    this.playersService.addMessage(payload.from, payload.to, payload.chatId, payload.message);
    this.server.to(payload.chatId).emit("msgToClient", payload.message);
  }

  @SubscribeMessage('enterRoom')
  enterRoom(client: Socket, payload: string): void {
    client.join(payload);
  }


  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, payload: string): void {
    client.leave(payload);
  }
  
  afterInit() {
    this.logger.log("Init");
  }

  handleConnection() {
      this.logger.log("Client connected:")
  }

  handleDisconnect() {
    this.logger.log("Client disconnected")
  }
}
