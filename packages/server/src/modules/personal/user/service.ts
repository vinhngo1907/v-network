import { AppLoggerService } from '@common/logger/service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor (){

    }
}
