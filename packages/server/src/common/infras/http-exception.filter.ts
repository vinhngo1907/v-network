import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
import { filterExceptionByStatus } from '../error/catch-error';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const error =
        exception instanceof HttpException
          ? exception.getResponse()
          : filterExceptionByStatus({status, message: exception['message']});
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        error,
      });
    }
  }
  
//   function filterExceptionByStatus(
//     status: number,
//     message: string,
//   ): HttpException {
//     switch (status) {
//       case HttpStatus.BAD_REQUEST:
//         return new BadRequestException(message);
//       case HttpStatus.UNAUTHORIZED:
//         return new UnauthorizedException(message);
//       case HttpStatus.FORBIDDEN:
//         return new ForbiddenException(message);
//       case HttpStatus.NOT_FOUND:
//         return new NotFoundException(message);
  
//       default:
//         return new InternalServerErrorException(message);
//     }
//   }
  