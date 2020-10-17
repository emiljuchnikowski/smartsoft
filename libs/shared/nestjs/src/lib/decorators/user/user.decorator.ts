import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_, context: ExecutionContext) => {
    const [ req ] = context.getArgs();
    return req.user;
});
