import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/utils/enums";

@ApiTags("courses")
@Controller("courses")
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post()
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateCourseDto) {
    dto.file = file;
    return this.courseService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.courseService.remove(+id);
  }
}
