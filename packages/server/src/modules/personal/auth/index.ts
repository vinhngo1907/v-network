import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./controller";
import { AuthService } from "./service";

@Module({
    imports: [
        // TypeOrmModule.forFeature([Role, Account]),
        // AccountModule,
        // UserModule,
        // PassportModule,
        // JwtModule.register(configService.getJwtConfig()),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
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
        // JwtModule
    ],
})
export class AuthModule {}