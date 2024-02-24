import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { IdeaModule } from 'src/idea/module';
import { MongoDbDriverModule, RedisModule } from 'src/database';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/appConfigService';
import { AppConfigMobule } from 'src/config/appConfigMobule';
import { LoggerMiddleware } from 'src/logger/middleware';
import { LoggerModule } from 'src/logger';

@Module({
    imports: [AppConfigMobule, LoggerModule, RedisModule]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
