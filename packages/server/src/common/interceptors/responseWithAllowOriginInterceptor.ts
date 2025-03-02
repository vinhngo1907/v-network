import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

import { AppConfigService } from 'src/config/service';

@Injectable()
export class ResponseAddAccessTokenToHeaderInterceptor
    implements NestInterceptor {
    constructor(private readonly appConfigService: AppConfigService) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const clientUrl = this.appConfigService.getClientUrl();

        const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();

        ResponseObj.setHeader(
            'Access-Control-Allow-Origin', clientUrl
        );
        return next.handle();
    }
}