import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { hashPassword, isValidPassword } from 'src/services/bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { generateActivationCode } from 'src/utils/utils';
import { MailService } from 'src/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) { }

  async register(dto: CreateUserDto) {
    const { email, password } = dto;
    const candidate = await this.userService.findByEmail(email);
    if (candidate) {
      throw new HttpException("Email is already taken", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(password);
    const activationCode = generateActivationCode();
    await this.mailService.sendActivationCode(dto.email, activationCode.code, `${dto.firstName} ${dto.lastName}`);
    const user = await this.userService.create({ ...dto, password: hashedPassword, activationCode });

    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return { user, token };
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.userService.findByEmail(email);

    const passwordIsValid = await isValidPassword(password, user.password);
    if (!user || passwordIsValid) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return { user, token };
  }
}
