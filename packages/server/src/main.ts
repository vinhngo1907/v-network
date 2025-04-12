import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules';
import { AppConfigService } from './config/service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { AppLoggerService } from './common/logger/service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { HttpExceptionFilter } from './common/infras/http-exception.filter';
import { AllExceptionsFilter } from './common/infras/all-exceptions.filter';
import {
	utilities as nestWinstonModuleUtilities,
	WinstonModule,
} from 'nest-winston';
import * as winston from "winston";
import * as cookieParser from 'cookie-parser';
import { ResponseAddAccessTokenToHeaderInterceptor } from './common/interceptors/responseWithAllowOriginInterceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger({
			level: process.env.LOG_LEVEL || 'info',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.ms(),
						nestWinstonModuleUtilities.format.nestLike(),
					),
				}),
				/** 
				 * - Write all logs with level `error` and below to `error.log`
				 * - Write all logs with level `info` and below to `combined.log`
				*/
				new winston.transports.File({ filename: './src/common/logger/logs/error.log', level: 'error' }),
				new winston.transports.File({ filename: './src/common/logger/logs/combined.log' }),
			],
		}),
		cors: true
	});
	// if(!configSer)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	const appConfigService = app.get(AppConfigService);
	const requiredEnvVariables = [
		'POSTGRES_HOST',
		'POSTGRES_PORT',
		'POSTGRES_USER',
		'POSTGRES_PASSWORD',
		'POSTGRES_DATABASE',
		'JWT_SECRET',
		'JWT_EXPIRATION_TIME',
		'MODE',
	];

	appConfigService.ensureValues(requiredEnvVariables);
	if (!appConfigService.isProduction()) {
		setupSwagger(app);
	}

	const prismaSerivce = app.get(DatabaseService);
	prismaSerivce.$connect();

	const logger = app.get(AppLoggerService);
	app.useLogger(logger);

	const port = appConfigService.port || 3333;

	const NODE_ENV = process.env.NODE_ENV || 'development';

	app.useGlobalFilters(new AllExceptionsFilter(appConfigService));
	app.use(cookieParser());
	app.useGlobalInterceptors(new ResponseAddAccessTokenToHeaderInterceptor(appConfigService));

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	await app.listen(port, () => {
		logger.log(`Server is running on port ${port}`, 'Bootstrap');
		logger.log(`Current node environment: ${NODE_ENV}`);
	});

	// await prismaSerivce.enableShutdownHooks(app);
}

bootstrap();

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('V Network Management API')
		.setDescription('The V Course API description')
		.setVersion('1.0')
		.addTag('auth')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
}

export const SRC_DIR = __dirname