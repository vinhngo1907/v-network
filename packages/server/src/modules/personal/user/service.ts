import { AppLoggerService } from '@common/logger/service';
import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserBadRequestException } from './exception';
import { Role, User, Account, AccountType } from "@prisma/client";
import { AppConfigService } from '@config/service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../auth/types';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        private databaseService: DatabaseService,
        private appConfigService: AppConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async checkEmailExisted(account: string): Promise<any> {
        try {
            const emailExisted = await this.databaseService.user.findUnique({
                where: {
                    email: account
                }
            });

            if (emailExisted) {
                throw new UserBadRequestException("Email is existed");
            }
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async createUserTransaction(
        manager: any,
        username: string,
        email: string,
        hashedPassword: string,
        fullName: string,
        userRole: Role[],
        type: AccountType,
    ): Promise<User> {
        const newAccount = await this.databaseService.account.create({
            data: {
                username, password: hashedPassword, type, rfToken: ''
            }
        });

        const newUser = await this.databaseService.user.create({
            data: {
                fullName, email,
                account: {
                    connect: { id: newAccount.id }
                },
                roles: {
                    connect: userRole.map(role => ({ id: role.id }))
                }
            },
            include: {
                roles: true
            }
        });

        // const tokenPayload: TokenPayload = {
        //     username: username, userId: newUser.id
        // }
        // const { accessTokenSecret, refreshTokenSecret } = this.appConfigService.getJwtSecrets();
        // const accessToken = this.jwtService.sign(tokenPayload, {
        //     secret: accessTokenSecret, expiresIn: '1d'
        // });
        return newUser;
    }
}
