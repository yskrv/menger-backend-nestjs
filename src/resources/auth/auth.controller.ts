import { Controller, Post, Body, HttpCode, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { JwtToken } from "src/common/decorators/jwt-token.decorator";
import { AuthGuard } from "src/guards/auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  @HttpCode(201)
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post("/login")
  @HttpCode(200)
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("/activate")
  activate(@JwtToken() token, @Body() dto: ActivateUserDto) {
    return this.authService.activate(dto, token);
  }
}
