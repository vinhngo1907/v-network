import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules';
import { AppConfigService } from 'src/config/service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLoggerService } from 'src/common/logger/service';
// import { MongoDBService } from './database/mongodb/service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);
	
	const appConfigService = app.get(AppConfigService);
	// const mongoSerivce = app.get(MongoDBService);
	// mongoSerivce.connect();
  
	const logger = app.get(AppLoggerService);
	app.useLogger(logger);

	const port = appConfigService.port;

	setupSwagger(app);
	await app.listen(port, () => {
		logger.log(`Server is running on port ${port}`, 'Bootstrap');
	});

}
bootstrap();

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Network auth example')
		.setDescription('The network auth API description')
		.setVersion('1.0')
		.addTag('auth')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
}
