/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get(':id/findplayers')
  findPlayers(@Param('id') id: string) {
    return this.playersService.findPlayers(id);
  }

  @Get(':id/friendrequests')
  friendRequests(@Param('id') id: string) {
    return this.playersService.friendRequestsReceived(id);
  }

  @Get(':id/friends')
  friends(@Param('id') id: string) {
    return this.playersService.friends(id);
  }

  @Get(':nick/:password')
  findOne(@Param('nick') nick: string, @Param('password') password: string) {
    return this.playersService.loginPlayer(nick, password);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Put(':id1/addfriendrequest/:id2')
  addFriendRequest(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.playersService.addFriendRequest(id1, id2);
  }

  @Put(':id1/addfriend/:id2')
  addFriend(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.playersService.addFriend(id1, id2);
  }

  @Put(':id1/removefriendrequest/:id2')
  removeFriendRequest(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.playersService.removeFriendRequest(id1, id2);
  }
}
