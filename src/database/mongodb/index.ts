import { Global, Module } from '@nestjs/common';
import { MongoDBService } from './service';

@Global()
@Module({
  providers: [MongoDBService],
  exports: [MongoDBService], // Export MongoDBService and MongooseModule
})
export class MongoDbDriverModule {}
