import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from 'src/config/appConfigservice';
import { AppLoggerService } from 'src/logger/service';


@Injectable()
export class MongoDbDriverService {

}