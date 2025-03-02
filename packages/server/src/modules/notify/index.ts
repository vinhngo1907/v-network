import { Module } from '@nestjs/common';
import { NotifyController } from './controller';
import { NotifyService } from './service';

@Module({
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
