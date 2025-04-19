import { Logger, Module } from "@nestjs/common";
import { AuthModule } from "./auth";
import { AccountModule } from "./account";
import { AuthService } from "./auth/service";
import { AccountService } from "./account/service";
import { UserModule } from "./user";
import { BcryptService } from "@modules/bcrypt/service";
import { KafkaService } from "@modules/kafka/service";

@Module({
    imports: [
        AuthModule,
        AccountModule,
        UserModule,
    ],
    providers: [
        AuthService,
        AccountService,
        BcryptService,
        Logger
    ],
})
export class PersonalModule{}