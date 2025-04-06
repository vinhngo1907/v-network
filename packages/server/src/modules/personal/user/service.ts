import { AppLoggerService } from '@common/logger/service';
import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserBadRequestException } from './exception';
import { Role, User, Account } from "@prisma/client";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        private databaseService: DatabaseService
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
        userRole: Role[]
    ): Promise<User> {
        const newAccount = await this.databaseService.account.create({
            data: {
                username, password: hashedPassword
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
}
