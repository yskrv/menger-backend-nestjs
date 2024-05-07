import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { Level, LevelSchema } from './schemas/level.schema';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Level.name, schema: LevelSchema }
    ]),
    CourseModule
  ],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService]
})
export class LevelModule { }
