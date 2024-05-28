import { Injectable } from '@nestjs/common';
import { CreateWordsTaskDto } from './dto/create-words-task.dto';
import { UpdateWordsTaskDto } from './dto/update-words-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WordsTask, WordsTasksDocument } from './schemas/words-task.schema';
import { Model } from 'mongoose';
import { LevelService } from '../level/level.service';

@Injectable()
export class WordsTaskService {
  constructor(
    @InjectModel(WordsTask.name)
    private readonly wordsTaskModel: Model<WordsTasksDocument>,
    private readonly levelService: LevelService
  ) { }


  async create(dto: CreateWordsTaskDto) {
    const newWordsTask = await new this.wordsTaskModel(dto).save();
    const level = await this.levelService.addWordsTaskToLevel({ levelId: dto.levelId, wordsTaskId: newWordsTask._id })
    return await this.wordsTaskModel.findByIdAndUpdate(newWordsTask._id, { courseId: level.courseId }, { new: true });
  }

  findAll() {
    return `This action returns all wordsTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wordsTask`;
  }

  update(id: number, updateWordsTaskDto: UpdateWordsTaskDto) {
    return `This action updates a #${id} wordsTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordsTask`;
  }
}
