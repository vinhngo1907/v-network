import { Module } from '@nestjs/common';
import { DatabaseService } from './mongodb/mongoDbDriverConnection';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
