import { Global, Module } from '@nestjs/common';
import { MongoDBService } from './service';
import { AppConfigMobule } from 'src/config/appConfigMobule';
import { AppConfigService } from 'src/config/appConfigService';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports:[ConfigModule],
  providers: [MongoDBService],
  exports: [MongoDBService], // Export MongoDBService and MongooseModule
})
export class MongoDbModule {}
