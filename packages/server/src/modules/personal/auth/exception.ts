import { CustomBadRequestException } from '@common/exception/CustomBadRequestException';
import { CustomForbiddenException } from '@common/exception/CustomForbiddenException';
import { CustomNotFoundException } from '@common/exception/CustomNotFoundException';
import { CustomUnknownException } from '@common/exception/CustomUnknownException';

export class AuthNotFoundException extends CustomNotFoundException {
  constructor(accountId: string) {
    super(accountId, 'Auth');
  }
}

export class AuthBadRequestException extends CustomBadRequestException {
  constructor(action: string) {
    super(action, 'Auth');
  }
}

export class AuthUnknownException extends CustomUnknownException {
  constructor(action: string, additionalInfo: string) {
    super(action, 'Auth', additionalInfo);
  }
}

export class AuthForbiddenException extends CustomForbiddenException {
  constructor(userId: string, accountId: string, action: string) {
    super(userId, accountId, action, 'Auth');
  }
}
