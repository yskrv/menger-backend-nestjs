import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Course, CourseDocument } from "./schemas/course.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
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

  async findAll() {
    return await this.courseModel.find();
  }

  async findLatest() {
    return await this.courseModel.find().sort({ createdAt: 1 }).limit(3);
  }

  async findBySlug(slug: string) {
    return this.courseModel.findOne({ slug }).populate('levels');
  }

  async addLevelToCourse(courseId: Types.ObjectId, levelId: Types.ObjectId) {
    return await this.courseModel.findByIdAndUpdate(courseId, { $addToSet: { levels: levelId } });
  }
}
