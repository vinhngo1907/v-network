import { AppLoggerService } from '@common/logger/service';
import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor (
        private databaseService: DatabaseService
    ){}
    
    async checkEmailExisted(account: string):Promise<any>{
        try {
            
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }
    
}
