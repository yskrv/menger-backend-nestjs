import { Module } from "@nestjs/common";
import { ConfigModule } from "./common/config/config.module";
import { MongooseConfigModule } from "./common/database/database.module";
import { TextToSpeechService } from "./services/text-to-speach.service";
import { GoogleCloudStorageService } from "./services/file-storage.service";
import { UserModule } from "./resources/user/user.module";
import { AuthModule } from "./resources/auth/auth.module";
import { ApplicationModule } from "./resources/applications/application.module";
import { TranslateModule } from "./resources/translate/translate.module";
import { TestController } from "./resources/test/test.controller";
import { CourseModule } from "./resources/course/course.module";
import { LevelModule } from './resources/level/level.module';
import { WordModule } from './resources/word/word.module';
import { GptModule } from "./resources/gpt/gpt.module";
import { WordsTaskModule } from './resources/words-task/words-task.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MongooseConfigModule,
    AuthModule,
    ApplicationModule,
    TranslateModule,
    CourseModule,
    LevelModule,
    WordModule,
    GptModule,
    WordsTaskModule
  ],
  controllers: [TestController],
  providers: [TextToSpeechService, GoogleCloudStorageService],
})
export class AppModule { }
