import { Module } from '@nestjs/common';
// import { IdeaModule } from 'src/idea/module';
// import { DatabaseModule } from 'src/database';
import { KafkaModule } from 'src/kafka/kafka.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
// import { HttpErrorFilter } from 'src/shared/http.error.filter';
// import { LogginInterceptor } from 'src/shared/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/appConfigService';

@Module({
    imports: [KafkaModule],
    controllers: [],
    providers: [
        ConfigService,
        AppConfigService
    ],
})
export class AppModule { }
