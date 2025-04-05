import { DatabaseService } from '@modules/database/service';
import { Injectable, Logger } from '@nestjs/common';
import { AccountBadRequestException } from './exception';

@Injectable()
export class AccountService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger,
    
    ){}

    async checkUsernameExisted(username: string): Promise<void> {
        try {
            const existedAccount = await this.databaseService.account.findUnique({
                where: {
                    username: username
                }
            });

            if (existedAccount) {
                throw new AccountBadRequestException('Username is existed');
            }
        } catch (error) {
            this.logger.error(error);
            throw new AccountBadRequestException('Username is existed');
        }
    }
}
