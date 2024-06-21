/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/entities/player.entity';
import { PlayersModule } from './players/players.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Player],
      synchronize: true
    }),
    PlayersModule
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
