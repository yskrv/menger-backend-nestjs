import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TextToSpeechService } from "src/services/text-to-speach.service";
import { GoogleCloudStorageService } from "src/services/file-storage.service";
import { Response } from "express";

interface textToSpeechDto {
  text: string;
  voice?: string;
}

@Controller("test")
@ApiTags("test")
export class TestController {
  constructor(
    private readonly ttsService: TextToSpeechService,
    private readonly fileStorageService: GoogleCloudStorageService,
  ) {}
  @Post()
  async handleTextToSpeech(@Body() dto: textToSpeechDto, @Res() res: Response) {
    const audioContent = await this.ttsService.convertTextToSpeech(
      dto.text,
      dto.voice,
    );
    const url = await this.fileStorageService.uploadBuffer(
      audioContent,
      "records",
    );
    res.json(url);
  }

  @Get("voices")
  async getVoices(@Res() res: Response) {
    const voices = await this.ttsService.listAvailableVoices();
    res.json(voices);
  }
}
