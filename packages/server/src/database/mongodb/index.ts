import { Global, Module } from '@nestjs/common';
import { MongoDBService } from './service';
import { AppConfigModule } from 'src/config/';
import { AppConfigService } from 'src/config/service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports:[ConfigModule],
  providers: [MongoDBService],
  exports: [MongoDBService], // Export MongoDBService and MongooseModule
})
export class MongoDbModule {}
