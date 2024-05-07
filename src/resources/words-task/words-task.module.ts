import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsTaskService } from './words-task.service';
import { WordsTaskController } from './words-task.controller';
import { WordsTask, WordsTaskSchema } from './schemas/words-task.schema';
import { LevelModule } from '../level/level.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WordsTask.name, schema: WordsTaskSchema }
    ]),
    LevelModule
  ],
  controllers: [WordsTaskController],
  providers: [WordsTaskService],
})
export class WordsTaskModule { }
