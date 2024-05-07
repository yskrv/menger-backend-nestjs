import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ApplicationModule } from "src/resources/applications/application.module";
import { CourseModule } from "src/resources/course/course.module";
import { LevelModule } from "src/resources/level/level.module";
import { UserModule } from "src/resources/user/user.module";
import { WordModule } from "src/resources/word/word.module";

const { DB_URL } = process.env;

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(DB_URL),
    UserModule,
    ApplicationModule,
    CourseModule,
    LevelModule,
    WordModule
  ],
})
export class MongooseConfigModule { }
