import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WordsTaskService } from './words-task.service';
import { CreateWordsTaskDto } from './dto/create-words-task.dto';
import { UpdateWordsTaskDto } from './dto/update-words-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/utils/enums';

@ApiTags('words-tasks')
@Controller('words-tasks')
export class WordsTaskController {
  constructor(private readonly wordsTaskService: WordsTaskService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Post()
  create(@Body() dto: CreateWordsTaskDto) {
    console.log(dto);
    return this.wordsTaskService.create(dto);
  }

  @Get()
  findAll() {
    return this.wordsTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordsTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordsTaskDto: UpdateWordsTaskDto) {
    return this.wordsTaskService.update(+id, updateWordsTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordsTaskService.remove(+id);
  }
}
