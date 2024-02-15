import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) { }

    get port(): number {
        return this.configService.get('HTTP_SERVER_PORT') || 3333;
    }
}
