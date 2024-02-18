import { Module } from '@nestjs/common';
import { DatabaseService } from './mongodb/service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
