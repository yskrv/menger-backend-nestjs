import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@ApiTags("organizations")
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.organizationService.findBySlug(slug);
  }

  @Patch(":id")
  updateOrganization(@Param("id") id: string, @Body() dto: UpdateOrganizationDto) {
    return this.organizationService.updateOrganization(id, dto);
  }
}
