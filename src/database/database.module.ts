import { Module } from '@nestjs/common';
import { DatabaseService } from './mongoDbDriverConnection';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
