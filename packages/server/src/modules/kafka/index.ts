import { Module } from '@nestjs/common';
import { KafkaService } from './service';
import { MessagesService } from '@modules/messages/service';
import { KafkaController } from './controller';

@Module({
  controllers: [KafkaController],
  providers: [KafkaService, MessagesService],
  // exports
})
export class KafkaModule { }
