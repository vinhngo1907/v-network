import { CustomBadRequestException } from '@common/exception/CustomBadRequestException';
import { CustomForbiddenException } from '@common/exception/CustomForbiddenException';
import { CustomNotFoundException } from '@common/exception/CustomNotFoundException';
import { CustomUnknownException } from '@common/exception/CustomUnknownException';

export class AccountNotFoundException extends CustomNotFoundException {
    constructor(accountId: string) {
        super(accountId, 'Account');
    }
}

export class AccountBadRequestException extends CustomBadRequestException {
    constructor(action: string) {
        super(action, 'Account');
    }
}

export class AccountUnknownException extends CustomUnknownException {
    constructor(action: string, additionalInfo: string) {
        super(action, 'Account', additionalInfo);
    }
}

export class AccountForbiddenException extends CustomForbiddenException {
    constructor(userId: string, accountId: string, action: string) {
        super(userId, accountId, action, 'Account');
    }
}
