import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  },
);
