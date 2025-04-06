import { DatabaseService } from "@modules/database/service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppLoggerService } from "src/common/logger/service";
import { UserService } from "../user/service";
import { AppConfigService } from "@config/service";
import { RegisterPayload, TokenPayload } from "./types";
import ValidationUtils from "@common/utils/validate";
import { AuthBadRequestException } from "./exception";
import { BcryptService } from "@modules/bcrypt/service";
import { AccountBadRequestException } from "../account/exception";

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

    async register({
        username, account, fullName, password: rawPass
    }: RegisterPayload): Promise<any> {
        try {
            if (ValidationUtils.validateEmail(account)) {
                const checkUser = ValidationUtils.validateRegister({
                    username, account
                });

                if (checkUser) {
                    throw new AuthBadRequestException(checkUser);
                }

                const newUserName = username.toLowerCase().replace(/ /g, '');
                const checkUsernameExisted = await this.databaseService.account.findUnique({
                    where: {
                        username: newUserName
                    }
                });

                if (checkUsernameExisted) {
                    throw new AccountBadRequestException("Username is existed");
                }

                await this.userService.checkEmailExisted(account);

                const hashedPassword = await this.bryptService.hashString(rawPass);
                const userRole = await this.databaseService.role.findFirstOrThrow({
                    where: {
                        name: "USER"
                    }
                });

                return await this.databaseService.$transaction(async (manager) => {
                    const createdUser = await this.userService.createUserTransaction(
                        manager, username, account, hashedPassword, fullName, [userRole]
                    )

                    return this.login({
                        username,
                        user: {
                            userId: createdUser.id,
                            email: account,
                            fullName
                        }
                    })

                });
            }

            if (ValidationUtils.validateMobile(account)) {

            }

        } catch (error: any) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async login(account: any) {
        try {
            const { username, user: { userId, email, fullName } } = account;
            const cookie = this.getCookieWithJwtToken(username, userId);
            return {
                cookie,
                user:{
                    id: userId,
                    email, username, fullName
                }
            }
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(`Error when logining: ${error}`);
        }
    }

    getCookieWithJwtToken(username: string, userId: string) {
        try {
            const payload: TokenPayload = { username, userId };

            const {
                secret,
                signOptions: { expiresIn },
            } = this.appConfigService.getJwtConfig();

            const token = this.jwt.sign(payload);
            return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn};SameSite=None; Secure`;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}