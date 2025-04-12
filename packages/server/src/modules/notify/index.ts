import { Global, Logger, Module } from '@nestjs/common';
import { NotifyController } from './controller';
import { NotifyService } from './service';

@Global()
@Module({
  controllers: [NotifyController],
  providers: [NotifyService, Logger]
})
export class NotifyModule {}
