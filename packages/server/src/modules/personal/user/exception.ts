import { CustomBadRequestException } from '@common/exception/CustomBadRequestException';
import { CustomForbiddenException } from '@common/exception/CustomForbiddenException';
import { CustomNotFoundException } from '@common/exception/CustomNotFoundException';
import { CustomUnknownException } from '@common/exception/CustomUnknownException';

export class UserNotFoundException extends CustomNotFoundException {
    constructor(accountId: string) {
        super(accountId, 'User');
    }
}

export class UserBadRequestException extends CustomBadRequestException {
    constructor(action: string) {
        super(action, 'User');
    }
}

export class UserUnknownException extends CustomUnknownException {
    constructor(action: string, additionalInfo: string) {
        super(action, 'User', additionalInfo);
    }
}

export class UserForbiddenException extends CustomForbiddenException {
    constructor(userId: string, accountId: string, action: string) {
        super(userId, accountId, action, 'User');
    }
}
