import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { AppConfigService } from 'src/config/appConfigservice';
import { AppLoggerService } from 'src/logger/service';

@Injectable()
export class MongoDBService {
    private client: MongoClient;
    private readonly logger: AppLoggerService;

    constructor(private readonly appConfig: AppConfigService) {
        this.logger = new AppLoggerService(MongoDBService.name);
    }

    async connect() {
        try {
            this.client = await MongoClient.connect(this.appConfig.mongoConfig.uri, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            });
            this.logger.log('MongoDB connected');
        } catch (error) {
            this.logger.error('Failed to connect to MongoDB', error.stack);
            throw error;
        }
    }

    async close() {
        if (this.client) {
            await this.client.close();
            this.logger.log('MongoDB connection closed');
        }
    }

    // Add more methods for interacting with MongoDB here
}