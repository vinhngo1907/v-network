import { Global, Module } from '@nestjs/common';
import { MongoDBService } from './service';

@Global()
@Module({
  providers: [MongoDBService],
  exports: [MongoDBService],
})

export class MongoDbDriverModule { }