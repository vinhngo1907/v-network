import { DatabaseService } from "@modules/database/service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppLoggerService } from "src/common/logger/service";
import { UserService } from "../user/service";
import { AppConfigService } from "@config/service";
import { RegisterPayload } from "./types";

@Injectable()
export class AuthService {
    private readonly logger = new AppLoggerService(AuthService.name);
    constructor(
        private readonly jwt: JwtService,
        private databaseService: DatabaseService,
        private userService: UserService,
        private appConfigService: AppConfigService
    ) { }

    async updateTwoStepVerificationState(userPhone: string, state: boolean): Promise<any> {
        // await Update
    }

    async login() {

    }

    async register({
        username, email, fullName, password: rawPass
    }: RegisterPayload): Promise<any> {

    }
}