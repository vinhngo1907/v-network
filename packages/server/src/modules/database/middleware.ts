import { Prisma, PrismaClient } from '@prisma/client';

// Instantiate a new PrismaClient
const prisma = new PrismaClient();

// Middleware to update userId in Account after creating a User
export function updateUserIdInAccountMiddleware(): Prisma.Middleware {
    return async (params, next) => {
        // console.log("🥃🥃🥃", params.args)
        if (params.model === 'User' && params.action === 'create') {
            const result = await next(params);
            const userId = result.id;
            const accountId = result.accountId;

            if (accountId) {
                await prisma.account.update({
                    where: { id: accountId },
                    data: { userId },
                });
            }

            return result;
        }

        return next(params);
    };
}

// Example Middleware to log all queries
export function logQueriesMiddleware(): Prisma.Middleware {
    return async (params, next) => {
        console.log(`Query: ${params.model}.${params.action}`);
        const result = await next(params);
        console.log(`Result: ${JSON.stringify(result)}`);
        return result;
    };
}

// You can add more middleware functions here
export const middlewares = [updateUserIdInAccountMiddleware, logQueriesMiddleware];
