import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppLoggerService } from "src/common/logger/service";

@Injectable()
export class AuthService{
    private readonly logger = new AppLoggerService(AuthService.name);
    constructor(
        private readonly jwt: JwtService,
    ){}

    async updateTwoStepVerificationState(userPhone: string, state: boolean):Promise<any>{
        // await Update
    }
}