import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import {DomainForbiddenError, DomainValidationError} from "@smartsoft001/domain-core";

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
    } else if (exception instanceof DomainForbiddenError) {
      status = HttpStatus.FORBIDDEN;
      message = exception.message;
    }

    const result = response.status(status);
    if (message && result.json) {
      result.json({
        details: message
      });
    } else if (!message && result.json) {
      result.json();
    } else if (message && !result.json) {
      result.send({
        details: message
      });
    } else {
      result.send();
    }
  }
}
