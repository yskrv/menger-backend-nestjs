import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { Application, ApplicationSchema } from "./schemas/application.schema";
import { ZoomService } from "src/services/zoom.service";
import { MailService } from "src/services/mail.service";
import { OrganizationModule } from "../organization/organization.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    HttpModule,
    OrganizationModule
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ZoomService, MailService],
})
export class ApplicationModule { }
