import { AppConfigService } from '../../src/config/service';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../modules/database/service';
import { Logger } from '@nestjs/common';
import { hashPassword } from '../modules/personal/auth/utils';

async function main() {
    const appConfigService = new AppConfigService(new ConfigService()); // Await the password retrieval
    const prisma = new DatabaseService();
    const logger = new Logger();
    try {
        const userRole = await prisma.role.findFirst({ where: { name: 'ADMIN' } });

        if (!userRole) {
            throw new Error('Admin role not found');
        }

        const adminPassword = appConfigService.getAdminPassword();
        const hashedPassword = await hashPassword(adminPassword); // Await the password hashing

        const newAccount = await prisma.account.create({
            data: {
                username: 'admin',
                password: hashedPassword, // Use the hashed password        
            },
        });

        console.log('New account created:', newAccount);

        const newUser = await prisma.user.create({
            data: {
                email: 'admin@vdev.com',
                fullName: 'V Dev',

                account: {
                    connect: { id: newAccount.id }
                },
                roles: {
                    connect: [
                        {
                            id: userRole.id
                        }
                    ]
                },
            },
            include: {
                account: true,
                roles: true,
            },
        });

        await prisma.account.update({
            where: {
                id: newUser.accountId
            },

            data: {
                userId: newUser.id,
                user: {
                    connect: { id: newUser.id }
                }
            },
            include: {
                user: true
            }
        })

        const newAdmin = await prisma.admin.create({
            data: {
                userId: newUser.id,
            },
        });

        console.log('Admin created successfully.');

        await prisma.user.update({
            where: {
                accountId: newAccount.id
            },
            data: {
                admin: {
                    connect: { id: newAdmin.id }
                },
                adminId: newAdmin.id
            },
            include: {
                admin: true
            }
        });

        console.log('User updated successfully!!!');
    } catch (error) {
        logger.error("Error: ", error);
        process.exit(1);
    } finally {
        prisma.$disconnect()
    }
}

main()

