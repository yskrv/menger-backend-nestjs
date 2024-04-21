import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";
import { JwtToken } from "src/common/decorators/jwt-token.decorator";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("/me")
  getMe(@JwtToken() token) {
    return this.userService.findByToken(token);
  }
}
