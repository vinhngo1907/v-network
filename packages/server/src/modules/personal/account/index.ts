import { Global, Logger, Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AccountService } from './service';
import { DatabaseService } from '@modules/database/service';

@Global()
@Module({
  controllers: [AccountController],
  providers: [AccountService, DatabaseService, Logger],
  exports: [AccountService]
})
export class AccountModule {}
