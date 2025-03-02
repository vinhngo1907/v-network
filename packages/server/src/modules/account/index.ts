import { Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AccountService } from './service';

@Module({
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
