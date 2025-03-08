import { Module } from '@nestjs/common';
import { KafkaService } from './service';

@Module({
  providers: [KafkaService]
})
export class KafkaModule {}
