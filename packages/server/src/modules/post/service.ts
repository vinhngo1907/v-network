import { AppConfigService } from '@config/service';
import { DatabaseService } from '@modules/database/service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(
        private readonly appConfigService: AppConfigService,
        private readonly databaseService: DatabaseService
    ) { }
    
}
