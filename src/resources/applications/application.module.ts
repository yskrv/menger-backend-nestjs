import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { ZoomService } from 'src/services/zoom.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }]), HttpModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ZoomService]
})
export class ApplicationModule { }
