import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { DomainValidationError } from "@smartsoft001/domain-core";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = null;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof DomainValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    if (message) {
      // this.logger.warn(message, "AppExceptionsFilter");
      response.status(status).json({
        details: message
      });
    } else {
      // this.logger.error((exception as HttpException).message, (exception as any).trace, "AppExceptionsFilter");
      response.status(status).json();
    }
  }
}
