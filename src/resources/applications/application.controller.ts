import { Controller, Post, Body, UseGuards, Get, Patch, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ApplicationService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Admin } from "src/common/decorators/roles.decorator";

@ApiTags("applications")
@Controller("applications")
export class ApplicationController {
  constructor(private readonly applicationsService: ApplicationService) { }

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Admin()
  @Get()
  getAll() {
    return this.applicationsService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Admin()
  @Patch("/accept/:id")
  acceptApplication(@Param("id") id: string) {
    return this.applicationsService.acceptApplication(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Admin()
  @Patch("/deny/:id")
  denyApplication(@Param("id") id: string) {
    return this.applicationsService.denyApplication(id);
  }
}
