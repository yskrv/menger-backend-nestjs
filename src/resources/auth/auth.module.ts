import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { jwtConfig } from 'src/common/jwt/jwt.config';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [UserModule, JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, MailService],
})
export class AuthModule { }
