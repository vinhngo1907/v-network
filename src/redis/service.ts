import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from 'src/config/appConfigservice';

export class RedisService {
    client: Redis;
    constructor(private readonly appConfig: AppConfigService) {
        this.client = new Redis({
            host: this.appConfig.redisConfig.host,
            port: this.appConfig.redisConfig.port,
            db: this.appConfig.redisConfig.db,
            password: this.appConfig.redisConfig.password,
        });
    }

    async close() {
        this.client.quit();
    }
}