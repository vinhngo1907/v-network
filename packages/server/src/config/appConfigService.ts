import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from 'src/config/constants';
import { HeaderConfig, InfluxConfig, MongoConfig, RedisConfig } from 'src/types';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) { }

	private getValue(key: string, throwOnMissing = true): string {
		const value = this.configService.get(configKeys[key]);
		if (!value && throwOnMissing) {
			throw new Error(`Config error = missing env.${key}`)
		}

		return value;
	}

	public ensureValues(keys: string[]) {
		keys.forEach((k) => this.getValue(k, true));
	}

	public get port(): number {
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
			uri: this.configService.get(configKeys.MONGODB_URI),
			// Add more MongoDB configuration properties as needed
		};
	}

	get influxConfig(): InfluxConfig {
		return {
			url: this.configService.get(configKeys.INFLUX_DB_URL),
			token: this.configService.get(configKeys.INFLUX_DB_TOEKN),
			org: this.configService.get(configKeys.INFLUX_DB_ORG),
			bucket: this.configService.get(configKeys.INFLUX_DB_BUCKET),
		};
	}
}
