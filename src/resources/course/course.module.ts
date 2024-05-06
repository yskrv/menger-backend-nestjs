import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { GoogleCloudStorageService } from "src/services/file-storage.service";
import { Course, CourseSchema } from "./schemas/course.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema }
    ])
  ],
  controllers: [CourseController],
  providers: [CourseService, GoogleCloudStorageService],
  exports: [CourseService]
})
export class CourseModule { }
