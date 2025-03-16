import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller';
import { HttpModule } from '@nestjs/axios';
// import { MongoDbModule } from 'src/database';
import { KafkaModule } from 'src/kafka';
import { KafkaService } from 'src/kafka/service';

@Module({
  imports: [
    // MongoDbModule, 
    HttpModule, KafkaModule],
  providers: [UserService, KafkaService],
  controllers: [UserController]
})

export class UserModule { }