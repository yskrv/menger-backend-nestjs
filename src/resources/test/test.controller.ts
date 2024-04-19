import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TextToSpeechService } from 'src/services/text-to-speach.service';
import { Response } from 'express';

interface textToSpeechDto {
  text: string;
}

@Controller('test')
@ApiTags("test")
export class TestController {
  constructor(private readonly ttsService: TextToSpeechService) { }
  @Post()
  async handleTextToSpeech(@Body() dto: textToSpeechDto, @Res() res: Response) {
    const audioContent = await this.ttsService.convertTextToSpeech(dto.text);
    res.type("audio/mpeg").send(audioContent);
  }
}
