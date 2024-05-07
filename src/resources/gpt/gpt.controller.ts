import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ApiTags } from '@nestjs/swagger';
import { GenerateTranscriptionOfWordDto } from './dto/generate-transcription-word.dto';

@ApiTags('gpt')
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }

  @Post('/transcription')
  generateTranscriptionOfWord(@Body() dto: GenerateTranscriptionOfWordDto) {
    return this.gptService.generateTranscriptionOfWord(dto);
  }
}