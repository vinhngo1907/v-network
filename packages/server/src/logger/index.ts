import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from 'src/logger/service';

@Global()
@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})

export class LoggerModule { }