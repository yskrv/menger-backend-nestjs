import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course, CourseDocument } from "./schemas/course.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { GoogleCloudStorageService } from "src/services/file-storage.service";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly googleCloudStorageService: GoogleCloudStorageService
  ) { }

  async create(dto: CreateCourseDto) {
    const { file, benefits, ...rest } = dto;
    const imageUrl = await this.googleCloudStorageService.uploadFile(file, "courses");
    return await new this.courseModel({ ...rest, imageUrl, benefits: benefits.split(';') }).save();
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
