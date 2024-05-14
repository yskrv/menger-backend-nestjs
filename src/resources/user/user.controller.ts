import { Controller, Delete, Get, Param, Patch, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";
import { JwtToken } from "src/common/decorators/jwt-token.decorator";
import { Student } from "src/common/decorators/roles.decorator";

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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch("/dictionary/:id")
  addWordToDictionary(@JwtToken() token: string, @Param("id") id: string) {
    return this.userService.addWordToDictionary(token, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("/dictionary")
  getDictionaryOfUser(@JwtToken() token) {
    return this.userService.getDictionaryOfUser(token);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Student()
  @Patch("/cart/:id")
  addCourseToCart(@JwtToken() token: string, @Param("id") id: string) {
    return this.userService.addCourseToCart(token, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Student()
  @Delete("/cart/:id")
  removeCourseToCart(@JwtToken() token: string, @Param("id") id: string) {
    return this.userService.removeCourseToCart(token, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Student()
  @Put("/cart")
  transferCoursesFromCartToCourses(@JwtToken() token: string) {
    return this.userService.transferCoursesFromCartToCourses(token);
  }
}
