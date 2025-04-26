import { DatabaseService } from "@modules/database/service";
import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppLoggerService } from "src/common/logger/service";
import { UserService } from "../user/service";
import { AppConfigService } from "@config/service";
import { RegisterPayload, TokenPayload } from "./types";
import ValidationUtils from "@common/utils/validate";
import { AuthBadRequestException } from "./exception";
import { BcryptService } from "@modules/bcrypt/service";
import { AccountBadRequestException } from "../account/exception";
import { Request, Response } from "express";
import { AccountType } from "@prisma/client"

@Injectable()
export class AuthService {
    private readonly logger = new AppLoggerService(AuthService.name);
    constructor(
        private readonly jwtService: JwtService,
        private databaseService: DatabaseService,
        private userService: UserService,
        private appConfigService: AppConfigService,
        private readonly bryptService: BcryptService,
    ) { }

    // async updateTwoStepVerificationState(userPhone: string, state: boolean): Promise<any> {
    //     // await Update
    // }

    async register({
        username, account, fullName, password: rawPass
    }: RegisterPayload): Promise<any> {
        try {
            console.log({ username, account, fullName, password: rawPass })
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

                const accountType: AccountType = AccountType.REGISTER;
                return await this.databaseService.$transaction(async (manager) => {
                    const createdUser = await this.userService.createUserTransaction(
                        manager, username, account, hashedPassword, fullName, [userRole], accountType
                    );

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
            const { cookie, accessToken } = await this.getCookieWithJwtToken(username, userId);
            return {
                cookie,
                user: {
                    id: userId,
                    email, username, fullName
                },
                accessToken
            }
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(`Error when logining: ${error}`);
        }
    }

    async signIn(payload: { account: string, password: string }, res: Response) {
        // try {
            const { account, password } = payload;
            const accountWithEmailAndUsername = await this.databaseService.account.findUniqueOrThrow({
                where: {
                    username: account
                },
                include: {
                    user: true,
                }
            });

            // const accountWithEmailAndUsername = await this.databaseService.account.findFirst({
            //     where: {
            //         username: {
            //             not: null
            //         }
            //     },
            //     include: {
            //         user: {
            //             where: {
            //                 email: {
            //                     not: null
            //                 }
            //             }
            //         }
            //     }
            // });

            if (!accountWithEmailAndUsername) {
                throw new AuthBadRequestException("User not found or not authorized");
            }

            if (accountWithEmailAndUsername.type !== AccountType.REGISTER) {
                throw new AuthBadRequestException(`Quick login account with ${accountWithEmailAndUsername.type} can't use this function.`);
            }

            const isMatch = await this.bryptService.isEqual(password, accountWithEmailAndUsername.password);
            if (!isMatch) {
                throw new AuthBadRequestException("Password is not correct");
            }

            const tokenPayload: TokenPayload = { username: accountWithEmailAndUsername.username, userId: accountWithEmailAndUsername.user.id }
            const { accessTokenSecret, refreshTokenSecret } = this.appConfigService.getJwtSecrets();
            const accessToken = this.jwtService.sign(tokenPayload, {
                secret: accessTokenSecret, expiresIn: '1d'
            });

            const refreshToken = this.jwtService.sign(tokenPayload, {
                secret: refreshTokenSecret, expiresIn: '7d'
            });

            await this.databaseService.account.update({
                where: {
                    id: accountWithEmailAndUsername.id,
                },
                data: {
                    rfToken: refreshToken
                }
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                path: '/auth/refresh-token',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            });

            delete accountWithEmailAndUsername.password;
            delete accountWithEmailAndUsername.rfToken;
            
            return {
                accessToken,
                account: accountWithEmailAndUsername
            }
    }

    async refreshToken(refreshToken: string) {
        try {
            if (!refreshToken) {
                throw new UnauthorizedException("Please login now!");
            }

            const result: TokenPayload = this.jwtService.verify(refreshToken);
            if (!result) {
                throw new UnauthorizedException("Something wrong, please login now!");
            }

            // const account = await this.databaseService.account.findFirstOrThrow({
            //     where: {
            //         userId: result.userId
            //     },
            //     include: {
            //         user: true
            //     }
            // });
            const account = await this.databaseService.account.findFirst({
                where: {
                    userId: result.userId
                },
                include: {
                    user: true
                }
            });

            if (!account) {
                throw new UnauthorizedException("Authentication failed, please login again!");
            }

            if (account.rfToken !== refreshToken) {
                throw new UnauthorizedException("Please login now!");
            }
            const payload: TokenPayload = { username: account.username, userId: account.user.id }
            const { accessTokenSecret, refreshTokenSecret } = this.appConfigService.getJwtSecrets();

            const accessToken = this.jwtService.sign(payload, {
                secret: accessTokenSecret,
                expiresIn: "1d"
            });

            const rfToken = this.jwtService.sign(payload, {
                secret: refreshTokenSecret,
                expiresIn: "7d"
            });

            await this.databaseService.account.update({
                where: {
                    id: account.id
                },
                data: {
                    rfToken: rfToken
                }
            })

            return { accessToken, account }
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(`Error when logining: ${error}`);
        }
    }

    createAccessToken(payload: any) {

    }

    async getCookieWithJwtToken(username: string, userId: string) {
        try {
            const payload: TokenPayload = { username, userId };

            const {
                secret,
                signOptions: { expiresIn },
            } = this.appConfigService.getJwtConfig();
            const { accessTokenSecret, refreshTokenSecret } = this.appConfigService.getJwtSecrets();
            let accessToken = null, refreshToken = null;
            if (secret == accessTokenSecret) {
                accessToken = this.jwtService.sign(payload, {
                    secret: accessTokenSecret,
                    expiresIn: expiresIn
                });

                refreshToken = this.jwtService.sign(payload, {
                    secret: refreshTokenSecret,
                    expiresIn: '7d'
                });

                await this.databaseService.account.update({
                    where: {
                        username: username,
                        userId: userId
                    },
                    data: {
                        rfToken: refreshToken
                    }
                })
            }

            return {
                cookie: `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expiresIn};SameSite=None; Secure`,
                accessToken
            };
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}