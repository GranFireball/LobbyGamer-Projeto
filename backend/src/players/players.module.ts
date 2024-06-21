/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Player])
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService]
})
export class PlayersModule {}
