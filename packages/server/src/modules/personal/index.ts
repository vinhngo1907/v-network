import { Module } from "@nestjs/common";
import { AuthModule } from "./auth";
import { AccountModule } from "./account";
import { AuthService } from "./auth/service";
import { AccountService } from "./account/service";
import { UserModule } from "./user";

@Module({
    imports: [
        AuthModule,
        AccountModule,
        UserModule,
    ],
    providers: [
        AuthService,
        AccountService
    ]
})
export class PersonalModule{}