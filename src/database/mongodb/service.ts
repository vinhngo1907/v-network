import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { AppLoggerService } from 'src/logger/service';

@Injectable()
export class MongoDBService {
    private readonly logger: AppLoggerService;
    private connection: mongoose.Connection;

    constructor(private readonly configService: ConfigService) {
        this.logger = new AppLoggerService(MongoDBService.name);
    }

    async connect() {
        try {
            const uri = this.configService.get('MONGODB_URI');
            this.connection = await mongoose.createConnection(uri, {
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
        if (this.connection) {
            await this.connection.close();
            this.logger.log('MongoDB connection closed');
        }
    }

    // You can add more methods here for interacting with MongoDB
}
