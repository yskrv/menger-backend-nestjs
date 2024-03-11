import { JwtModuleOptions } from '@nestjs/jwt';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: JWT_EXPIRES_IN },
};