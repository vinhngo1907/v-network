import { Global, Module } from '@nestjs/common';
import { MongoDbDriverService } from './service';

@Global()
@Module({
  providers: [MongoDbDriverService],
  exports: [MongoDbDriverService],
})

export class MongoDbDriverModule { }