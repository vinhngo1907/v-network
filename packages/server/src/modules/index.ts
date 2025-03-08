import { HttpException, Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { MongoDbModule, RedisModule } from 'src/database';
import { AppConfigModule } from 'src/config';
import { LoggerMiddleware } from 'src/common/logger/middleware';
import { LoggerModule } from 'src/common/logger';
import { PostModule } from './post';
import { CommentModule } from 'src/modules/comment/';
import { APP_FILTER } from '@nestjs/core';

@Module({
	imports: [
		AppConfigModule, LoggerModule,
		PostModule,
		CommentModule,
		//  RedisModule,
		MongoDbModule
	],
	providers: [
		Logger,
		{
			provide: APP_FILTER,
			useClass: HttpException
		}
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
