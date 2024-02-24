import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { IdeaModule } from 'src/idea/module';
import { MongoDbDriverModule, RedisModule } from 'src/database';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/appConfigService';
import { AppConfigMobule } from 'src/config/appConfigMobule';
import { LoggerMiddleware } from 'src/logger/middleware';

@Module({
    imports: [MongoDbDriverModule, RedisModule, AppConfigMobule],
    controllers: [],
    providers: [
        ConfigService,
        AppConfigService
    ],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
