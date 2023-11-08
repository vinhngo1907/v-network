import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { KafkaModule } from './kafka/kafka.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http.error.filter';
import { LogginInterceptor } from './shared/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './config/appConfigService';

@Module({
    imports: [IdeaModule, UserModule, DatabaseModule, KafkaModule],
    controllers: [],
    providers: [,
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LogginInterceptor,
        },
        ConfigService,
        AppConfigService
    ],
})
export class AppModule { }
