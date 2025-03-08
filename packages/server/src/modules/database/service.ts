import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { camelCase, flattenDeep, snakeCase } from 'lodash';

@Injectable()
export class DatabaseService extends PrismaClient {
    private logger: Logger;

    constructor() {
        super();
        this.logger = new Logger(DatabaseService.name);
    }

    async onModuleInit() {
        await this.$connect();
        this.logger.log("Prisma connected");
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
            this.logger.log('Primsa disconnected');
        });
    }

    async close() {
        await this.$disconnect();
    }

    // async dropDatabase() {
    //     if (process.env.NODE_ENV === 'production') {
    //         throw new Error('Cannot drop database in production');
    //     }

    //     const modelKeys = Prisma.dmmf.datamodel.models.map((m) => m.name);
    //     return Promise.all(
    //         modelKeys.map((modelName: any) => (this[camelCase(modelName)] as any).deleteMany()),
    //     );
    // }
}