import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization, OrganizationSchema } from './schemas/organization.schema';
import { GoogleCloudStorageService } from 'src/services/file-storage.service';
import { UserModule } from '../user/user.module';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
    UserModule, 
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, GoogleCloudStorageService, MailService],
  exports: [OrganizationService]
})
export class OrganizationModule { }
