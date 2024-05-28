import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { convertToSlug, generatePassword } from 'src/utils/utils';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { GoogleCloudStorageService } from 'src/services/file-storage.service';
import { AddUserToOrganizationDto } from './dto/add-user-to-organization.dto';
import { UserService } from '../user/user.service';
import { MailService } from 'src/services/mail.service';
import { hashPassword } from 'src/services/bcrypt';
import { UserRole } from 'src/utils/enums';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
    private readonly userService: UserService,
    private readonly googleCloudStorageService: GoogleCloudStorageService,
    private readonly mailService: MailService
  ) { }

  async create(dto: CreateOrganizationDto) {
    const slug: string = convertToSlug(dto.name);
    return await new this.organizationModel({ name: dto.name, slug }).save();
  }

  async findAll() {
    return await this.organizationModel.find();
  }

  async findBySlug(slug: string) {
    return await this.organizationModel.findOne({ slug }).populate(["students", "managers"]);
  }

  async updateOrganization(id: string, dto: UpdateOrganizationDto) {
    if (dto.file) {
      const imageUrl: string = await this.googleCloudStorageService.uploadFile(dto.file, "organizations");
      dto.imageUrl = imageUrl;
    }
    const { file, ...rest } = dto;
    return await this.organizationModel.findByIdAndUpdate(id, rest, { new: true });
  }

  async addStudentToOrganization(id: string, dto: AddUserToOrganizationDto) {
    const password = generatePassword();
    const hashedPassword = await hashPassword(password);
    const user = await this.userService.create({ ...dto, password: hashedPassword, isActivated: true });
    const organization = await this.organizationModel.findByIdAndUpdate(id, { $addToSet: { students: user._id } }, { new: true }).populate("students");
    await this.mailService.sendUserCredentials(dto.email, `${dto.firstName} ${dto.lastName}`, organization.name, password);
    return user;
  }

  async addManagerToOrganization(id: string, dto: AddUserToOrganizationDto) {
    const password = generatePassword();
    const hashedPassword = await hashPassword(password);
    const user = await this.userService.create({ ...dto, password: hashedPassword, isActivated: true, role: UserRole.MANAGER });
    const organization = await this.organizationModel.findByIdAndUpdate(id, { $addToSet: { managers: user._id } }, { new: true }).populate("students");
    await this.mailService.sendUserCredentials(dto.email, `${dto.firstName} ${dto.lastName}`, organization.name, password);
    return user;
  }

  async addCourseToOrganization(organizationId: string, courseId: string) {
    return await this.organizationModel.findByIdAndUpdate(organizationId, { $addToSet: { courses: courseId } }, { new: true });
  }
}
