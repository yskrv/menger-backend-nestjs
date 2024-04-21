import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const JwtToken = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.replace(/^Bearer\s/, "");
    return token;
  },
);
