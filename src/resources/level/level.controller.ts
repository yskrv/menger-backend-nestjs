import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/utils/enums';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@ApiTags("level")
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  findAll() {
    return this.levelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelService.remove(+id);
  }
}
