import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TextToSpeechService } from 'src/services/text-to-speach.service';
import { GoogleCloudStorageService } from 'src/services/file-storage.service';
import { Word, WordSchema } from './schemas/word.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema }
    ])
  ],
  controllers: [WordController],
  providers: [WordService, TextToSpeechService, GoogleCloudStorageService],
})
export class WordModule { }
