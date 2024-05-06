import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
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

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get("/latest")
  findLatest() {
    return this.courseService.findLatest();
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.courseService.findBySlug(slug);
  }
}
