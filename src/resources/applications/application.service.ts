import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { Application, ApplicationDocument } from "./schemas/application.schema";
import { ZoomService } from "src/services/zoom.service";
import { MailService } from "src/services/mail.service";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
    private readonly zoomService: ZoomService,
    private readonly mailService: MailService,
  ) { }

  async create(dto: CreateApplicationDto) {
    const response = await this.zoomService.createMeeting(
      `${dto.organizationName} өкілі ${dto.fullName}`,
      dto.meetingDate,
    );
    dto.meetingJoinUrl = response.joinUrl;
    dto.meetingStartUrl = response.startUrl;
    const application = new this.applicationModel(dto);

    await this.mailService.sendZoomLink(application.email, application.fullName, application.meetingJoinUrl, application.meetingDate.toString());

    return application.save();
  }
}
