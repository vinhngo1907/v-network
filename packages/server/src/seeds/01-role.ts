import { DatabaseService } from '../modules/database/service';
import { Logger } from '@nestjs/common';
import { roles } from '../../prisma/mock/data';

async function createRoles() {
    if (process.env.NODE_ENV === 'production') return;
    const prisma = new DatabaseService();
    const logger = new Logger();
    try {
        await prisma.role.createMany({
            data: roles,
        });

        console.log('Roles inserted successfully.');
    } catch (error) {
        logger.error("Error: ",error);
        process.exit(1);
    } finally {
        prisma.$disconnect();
    }
}

createRoles();