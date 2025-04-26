import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { AppConfigService } from 'src/config/service';
// import { configService } from 'src/config/config.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly appConfigService: AppConfigService) {}

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		console.error('❌ Exception caught by AllExceptionsFilter:', exception);

		const path = request.originalUrl || request.url || '';
		let status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		if (status === HttpStatus.UNAUTHORIZED && path === '/auth/profile') {
			response.setHeader(
				'Access-Control-Allow-Origin',
				this.appConfigService.getClientUrl(),
			);
			response.setHeader(
				'Set-Cookie',
				`Authentication=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure`,
			);
			response.status(HttpStatus.OK).send();
			return;
		}

		let message: any;

		if (exception instanceof HttpException) {
			const res = exception.getResponse();
			if (typeof res === 'string') {
				message = res;
			} else if (typeof res === 'object' && 'message' in res) {
				message = (res as any).message;
			} else {
				message = res;
			}
		} else if (exception instanceof Error) {
			message = exception.message;
		} else {
			message = 'Internal server error';
		}

		// xử lý lại message dạng array nếu cần
		if (Array.isArray(message)) {
			message = message.map((msg) => {
				if (typeof msg === 'string' && msg.split(' ')[0].includes('.')) {
					const customMessage = msg.split(' ');
					customMessage[0] = customMessage[0].split('.')[2];
					return customMessage.join(' ');
				}
				return msg;
			});
		}

		response.status(status).json({
			status,
			timestamp: new Date().toUTCString(),
			message,
			path,
		});
	}
}
