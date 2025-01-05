import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfigService } from "./appConfigService";
@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [AppConfigService, ConfigService],
    exports: [AppConfigService]
})
export class AppConfigModule { }