import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  imports:[DatabaseModule, HttpModule, KafkaModule],
  providers: [UserService, KafkaService],
  controllers: [UserController]
})

export class UserModule {}
