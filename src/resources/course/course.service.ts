import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Course, CourseDocument } from "./schemas/course.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
import { GoogleCloudStorageService } from "src/services/file-storage.service";
import { ensureBoolean } from "src/utils/utils";
import { OrganizationService } from "../organization/organization.service";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly googleCloudStorageService: GoogleCloudStorageService,
    private readonly organizationService: OrganizationService
  ) { }

  async create(dto: CreateCourseDto) {
    const { file, benefits, price, isPublic, organizationId, ...rest } = dto;
    const imageUrl = await this.googleCloudStorageService.uploadFile(file, "courses");
    if (organizationId) {
      const course = await new this.courseModel({ ...rest, imageUrl, price: Number(price), isPublic: ensureBoolean(isPublic), organizationId, benefits: benefits.split(';') }).save();
      await this.organizationService.addCourseToOrganization(organizationId, course._id.toString());
      return course;
    }
    return await new this.courseModel({ ...rest, imageUrl, price: Number(price), isPublic: ensureBoolean(isPublic), benefits: benefits.split(';') }).save();
  }

  async findAll() {
    return await this.courseModel.find().populate("organizationId");
  }

  async findPublicCourses() {
    return await this.courseModel.find({ isPublic: true });
  }

  async findLatest() {
    return await this.courseModel.find({ isPublic: true }).sort({ createdAt: 1 }).limit(3);
  }

  async findBySlug(slug: string) {
    return this.courseModel.findOne({ slug }).populate('levels').populate("organizationId");
  }

  async addLevelToCourse(courseId: Types.ObjectId, levelId: Types.ObjectId) {
    return await this.courseModel.findByIdAndUpdate(courseId, { $addToSet: { levels: levelId } });
  }

  async update(id: string, dto: UpdateCourseDto) {
    const { file, benefits, price, ...rest } = dto;
    let imageUrl: string = "";
    if (file) {
      imageUrl = await this.googleCloudStorageService.uploadFile(file, "courses");
    }

    return await this.courseModel.findByIdAndUpdate(id, file ? { ...rest, price: Number(price), imageUrl, benefits: benefits.split(';') } : { ...rest, price: Number(price), benefits: benefits.split(';') }, { new: true });
  }
}
