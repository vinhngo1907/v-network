import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller';
import { HttpModule } from '@nestjs/axios';
import { MongoDbModule } from 'src/database';
import { KafkaModule } from 'src/kafka/kafka.module';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  imports: [MongoDbModule, HttpModule, KafkaModule],
  providers: [UserService, KafkaService],
  controllers: [UserController]
})

export class UserModule { }