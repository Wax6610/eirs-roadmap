import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import IUser from './types/IUser';

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
