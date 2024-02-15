import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/appConfigService';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);
	const appConfigService = app.get<AppConfigService>(AppConfigService);
	await app.listen(appConfigService.port);
}
bootstrap();

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Book auth example')
		.setDescription('The book auth API description')
		.setVersion('1.0')
		.addTag('auth')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
}
