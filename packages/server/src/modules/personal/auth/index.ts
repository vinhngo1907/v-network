import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { DatabaseService } from "@modules/database/service";
import { APP_GUARD } from "@nestjs/core";
import { AppConfigService } from "@config/service";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		// TypeOrmModule.forFeature([Role, Account]),
		// AccountModule,
		// UserModule,
		// PassportModule,
		JwtModule.registerAsync({
			useFactory: async (appConfig: AppConfigService) => appConfig.getJwtConfig(),
			inject: [AppConfigService]
		})],
	controllers: [AuthController],
	providers: [
		DatabaseService,
		AuthService,
		AppConfigService,
		ConfigService,
		// LocalStrategy,
		// JwtStrategy,
		Logger,
		// {
		//   provide: APP_GUARD,
		//   useClass: RolesGuard,
		// },
	],
	exports: [
		AuthService,
		JwtModule
	],
})
export class AuthModule { }