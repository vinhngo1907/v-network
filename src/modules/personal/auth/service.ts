import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppLoggerService } from "src/logger/service";

@Injectable()
export class AuthService{
    private readonly logger = new AppLoggerService(AuthService.name);
    constructor(
        private readonly jwt: JwtService,
    ){}

    async validateUser(username: string, pass: string):Promise<any>{
        
    }
}