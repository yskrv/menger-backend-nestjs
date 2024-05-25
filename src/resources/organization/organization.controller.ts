import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Patch, Param, Body, UseInterceptors, UseGuards, UploadedFile } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Admin, Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/utils/enums';
import { AddUserToOrganizationDto } from './dto/add-user-to-organization.dto';

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

  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(":id")
  updateOrganization(@UploadedFile() file: Express.Multer.File, @Param("id") id: string, @Body() dto: UpdateOrganizationDto) {
    dto.file = file;
    return this.organizationService.updateOrganization(id, dto);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch("/student/:id")
  addStudentToOrganization(@Param("id") id: string, @Body() dto: AddUserToOrganizationDto) {
    return this.organizationService.addStudentToOrganization(id, dto);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch("/manager/:id")
  addManagerToOrganization(@Param("id") id: string, @Body() dto: AddUserToOrganizationDto) {
    return this.organizationService.addManagerToOrganization(id, dto);
  }
}
