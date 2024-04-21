import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";

@ApiTags("applications")
@Controller("applications")
export class ApplicationController {
  constructor(private readonly applicationsService: ApplicationService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }
}
