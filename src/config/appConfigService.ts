import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from 'src/config/constants';
import { HeaderConfig, MongoConfig, RedisConfig } from 'src/types';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) { }

	get port(): number {
		return this.configService.get('HTTP_SERVER_PORT') || 3333;
	}

	get redisConfig(): RedisConfig {
		return {
			host: this.configService.get(configKeys.REDIS_HOST),
			port: this.configService.get(configKeys.REDIS_PORT),
			password: this.configService.get(configKeys.REDIS_PASSWORD),
			db: this.configService.get(configKeys.REDIS_DB),
			ex: this.configService.get(configKeys.REDIS_EX),
		};
	}
	get mongoConfig(): MongoConfig {
		return {
			uri: this.configService.get<string>('MONGODB_URI'),
			// Add more MongoDB configuration properties as needed
		};
	}
}
