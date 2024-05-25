import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization, OrganizationSchema } from './schemas/organization.schema';
import { GoogleCloudStorageService } from 'src/services/file-storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, GoogleCloudStorageService],
  exports: [OrganizationService]
})
export class OrganizationModule { }
