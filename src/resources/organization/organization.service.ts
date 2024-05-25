import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from './schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { convertToSlug } from 'src/utils/utils';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { GoogleCloudStorageService } from 'src/services/file-storage.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
    private readonly googleCloudStorageService: GoogleCloudStorageService
  ) { }

  async create(dto: CreateOrganizationDto) {
    const slug: string = convertToSlug(dto.name);
    return await new this.organizationModel({ name: dto.name, slug }).save();
  }

  async findAll() {
    return await this.organizationModel.find();
  }

  async findBySlug(slug: string) {
    return await this.organizationModel.findOne({ slug });
  }

  async updateOrganization(id: string, dto: UpdateOrganizationDto) {
    if (dto.file) {
      const imageUrl: string = await this.googleCloudStorageService.uploadFile(dto.file, "organizations");
      dto.imageUrl = imageUrl;
    }
    const { file, ...rest } = dto;
    return await this.organizationModel.findByIdAndUpdate(id, rest, { new: true });
  }
}
