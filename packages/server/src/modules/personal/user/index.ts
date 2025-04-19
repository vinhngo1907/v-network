import { Module, Logger, Global } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { DatabaseService } from '@modules/database/service';
import { KafkaService } from '@modules/kafka/service';

@Global()
@Module({
    controllers: [UserController],
    providers: [UserService, DatabaseService, Logger, KafkaService],
    exports: [UserService],
})
export class UserModule { }
