import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level, LevelDocument } from './schemas/level.schema';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { AddWordsTaskDto } from './dto/add-words-task.dto'
import { CourseService } from '../course/course.service';
;

@Injectable()
export class LevelService {
  constructor(
    @InjectModel(Level.name)
    private levelModel: Model<LevelDocument>,
    private courseService: CourseService
  ) { }

  async create(dto: CreateLevelDto) {
    const lastLevel = await this.levelModel.findOne({ courseId: dto.courseId }).sort({ order: -1 }).exec();
    const order = lastLevel ? lastLevel.order + 1 : 1;
    const newLevel = await new this.levelModel({ ...dto, order }).save();
    await this.courseService.addLevelToCourse(dto.courseId, newLevel._id);
    return newLevel;
  }

  async addWordsTaskToLevel(dto: AddWordsTaskDto) {
    return await this.levelModel.findByIdAndUpdate(dto.levelId, { $addToSet: { wordsTasks: dto.wordsTaskId } }, { new: true });
  }

  findAll() {
    return `This action returns all level`;
  }

  async findOne(id: string) {
    return await this.levelModel.findById(id).populate('wordsTasks');
  }

  async update(id: string, dto: UpdateLevelDto) {
    return await this.levelModel.findByIdAndUpdate(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
