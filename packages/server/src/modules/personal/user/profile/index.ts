import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller';
import { HttpModule } from '@nestjs/axios';

// import { MongoDbModule } from 'src/database';
// import { KafkaModule } from 'src/kafka';

@Module({
	imports: [
		// MongoDbModule, 
		HttpModule
	],
	providers: [UserService],
	controllers: [UserController]
})

export class UserModule { }