import { Module } from '@nestjs/common';
import { RedisModule } from './redis';
import { MongoDbDriverModule } from './mongodb';
@Module({
  providers: [RedisModule, MongoDbDriverModule],
  // exports: [DatabaseService]
})
export class DatabaseModule {}
