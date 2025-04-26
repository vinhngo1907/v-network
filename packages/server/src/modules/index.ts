import { HttpException, Logger, MiddlewareConsumer, Module } from '@nestjs/common';
// import { MongoDbModule, RedisModule } from 'src/database';
import { AppConfigModule } from 'src/config';
import { LoggerMiddleware } from 'src/common/logger/middleware';
import { LoggerModule } from 'src/common/logger';
import { PostModule } from './post';
import { CommentModule } from 'src/modules/comment/';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database';
import { PersonalModule } from './personal';
import { HttpExceptionFilter } from '@common/infras/http-exception.filter';
import { NotifyModule } from './notify';
import { JwtAuthGuard } from './personal/auth/guards/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { AppConfigService } from '@config/service';

@Module({
	imports: [
		AppConfigModule, 
		LoggerModule,
		PostModule,
		CommentModule,
		NotifyModule,
		//  RedisModule,
		// MongoDbModule,
		DatabaseModule,
		PersonalModule,
		// PassportModule,
		// 		JwtModule.registerAsync({
		// 			useFactory: async (appConfig: AppConfigService) => appConfig.getJwtConfig(),
		// 			inject: [AppConfigService]
		// 		})
	],
	providers: [
		Logger,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
