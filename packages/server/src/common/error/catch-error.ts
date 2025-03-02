import {
    BadRequestException,
    ForbiddenException,
    HttpStatus,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';

export const filterExceptionByStatus = (error: { status: number, message: string }) => {
    switch (error.status) {
        case HttpStatus.BAD_REQUEST:
            throw new BadRequestException(error.message);

        case HttpStatus.UNAUTHORIZED:
            throw new UnauthorizedException(error.message);

        case HttpStatus.FORBIDDEN:
            throw new ForbiddenException(error.message);

        case HttpStatus.NOT_FOUND:
            throw new NotFoundException(error.message);

        case HttpStatus.BAD_REQUEST:
            throw new BadRequestException(error.message);

        default:
            return new InternalServerErrorException(error.message);
    }
};
