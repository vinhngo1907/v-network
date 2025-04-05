import { DatabaseService } from "@modules/database/service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppLoggerService } from "src/common/logger/service";
import { UserService } from "../user/service";
import { AppConfigService } from "@config/service";
import { RegisterPayload } from "./types";
import ValidationUtils from "@common/utils/validate";
import { AuthBadRequestException } from "./exception";
import { BcryptService } from "@modules/bcrypt/service";
@Injectable()
export class AuthService {
    private readonly logger = new AppLoggerService(AuthService.name);
    constructor(
        private readonly jwt: JwtService,
        private databaseService: DatabaseService,
        private userService: UserService,
        private appConfigService: AppConfigService,
        private readonly bryptService: BcryptService,
    ) { }

    async updateTwoStepVerificationState(userPhone: string, state: boolean): Promise<any> {
        // await Update
    }

    async login() {

    }

    async register({
        username, account, fullName, password: rawPass
    }: RegisterPayload): Promise<any> {
        try {
            if(ValidationUtils.validateEmail(account)){
                const checkUser = ValidationUtils.validateRegister({
                    username, account
                });

                if(checkUser){
                    throw new AuthBadRequestException(checkUser);
                }

                const hashedPassword = await this.bryptService.hashString(rawPass);
                // this.databaseService.user
            }

            if(ValidationUtils.validateMobile(account)) {

            }

        } catch (error: any) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}