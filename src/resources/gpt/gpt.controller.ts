import { Controller, Post, Body, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GptWordDto } from './dto/gpt-word.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/utils/enums';

@ApiTags('gpt')
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @Post('/transcription')
  generateTranscriptionOfWord(@Body() dto: GptWordDto) {
    return this.gptService.generateTranscriptionOfWord(dto);
  }

  @Post('/wrongOptions')
  generateWrongOptionsForWordsTask(@Body() dto: GptWordDto) {
    return this.gptService.generateWrongOptionsForWordsTask(dto);
  }
}