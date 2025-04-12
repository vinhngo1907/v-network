import { Controller, Get, Logger } from '@nestjs/common';
import { NotifyService } from './service';

@Controller('notify')
export class NotifyController {
    constructor(
        private readonly logger: Logger,
        private readonly notifyService: NotifyService,
    ) { }

    @Get('hello')
    getHello(): string {
        this.logger.log('Im here');
        // return this.notifyService.getHello();
        return "hello Coders tokyo"
    }
}
