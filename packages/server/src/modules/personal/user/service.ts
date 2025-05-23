import { AppLoggerService } from '@common/logger/service';
import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserBadRequestException, UserNotFoundException } from './exception';
import { Role, User, Account, AccountType } from "@prisma/client";
import { AppConfigService } from '@config/service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../auth/types';
import { Request } from 'express';
import { PrismaFeatures } from '@modules/database/util';

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

        return newUser;
    }

    async findUserById(id: string) {
        const user = await this.databaseService.user.findFirstOrThrow({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new UserNotFoundException("User not found or/and authorized");
        }

        return user;
    }

    async listUser(queryString: string) {
        try {
            const features = new PrismaFeatures(queryString);

            const filtering = features.filtering();
            const pagination = features.paginating();
            const sorting = features.sorting();

            const [users, total] = await Promise.all([
                this.databaseService.account.findMany({
                    ...pagination,
                    ...sorting,
                    where: filtering.queryString?.where || {},
                    include: { user: true },
                }),
                this.databaseService.account.count({
                    where: filtering.queryString?.where || {},
                }),
            ]);

            return { users, total };
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }
}
