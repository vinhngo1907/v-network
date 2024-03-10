import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongoDbModule, RedisModule } from 'src/database';
import { AppConfigMobule } from 'src/config/appConfigMobule';
import { LoggerMiddleware } from 'src/logger/middleware';
import { LoggerModule } from 'src/logger';

@Module({
    imports: [AppConfigMobule, LoggerModule, RedisModule, MongoDbModule]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
