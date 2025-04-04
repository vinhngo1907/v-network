import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfigService } from "./service";
@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [AppConfigService, ConfigService],
    exports: [AppConfigService]
})
export class AppConfigModule { }