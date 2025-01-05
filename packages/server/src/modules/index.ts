import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongoDbModule, RedisModule } from 'src/database';
import { AppConfigModule } from 'src/config';
import { LoggerMiddleware } from 'src/logger/middleware';
import { LoggerModule } from 'src/logger';

@Module({
	imports: [AppConfigModule, LoggerModule,
		//  RedisModule,
		MongoDbModule]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
