import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TextToSpeechService } from 'src/services/text-to-speach.service';
import { GoogleCloudStorageService } from 'src/services/file-storage.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word, WordDocument } from './schemas/word.schema';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name)
    private readonly wordModel: Model<WordDocument>,
    private readonly textToSpeechService: TextToSpeechService,
    private readonly googleCloudStorageService: GoogleCloudStorageService,
  ) { }

  async create(dto: CreateWordDto) {
    const { eng, kaz, transcription, voice, file } = dto;
    const audio = await this.textToSpeechService.convertTextToSpeech(eng, voice);
    const audioUrl = await this.googleCloudStorageService.uploadBuffer(audio, "records");
    const imageUrl = await this.googleCloudStorageService.uploadFile(file, "words");
    return await new this.wordModel({ eng, kaz, transcription, audioUrl, imageUrl }).save();
  }

  findAll() {
    return `This action returns all word`;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
