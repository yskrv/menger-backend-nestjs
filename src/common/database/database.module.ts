import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { ApplicationModule } from "src/resources/applications/application.module";
import { CourseModule } from "src/resources/course/course.module";
import { LevelModule } from "src/resources/level/level.module";
import { UserModule } from "src/resources/user/user.module";
import { WordModule } from "src/resources/word/word.module";
import { WordsTaskModule } from "src/resources/words-task/words-task.module";

const { DB_URL } = process.env;

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(DB_URL),
    UserModule,
    ApplicationModule,
    CourseModule,
    LevelModule,
    WordModule,
    WordsTaskModule
  ],
})
export class MongooseConfigModule { }
