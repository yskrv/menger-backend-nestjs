import { Module } from "@nestjs/common";
import { ConfigModule } from "./common/config/config.module";
import { UserModule } from "./resources/user/user.module";
import { MongooseConfigModule } from "./common/database/database.module";
import { AuthModule } from "./resources/auth/auth.module";
import { ApplicationModule } from "./resources/applications/application.module";
import { TranslateModule } from "./resources/translate/translate.module";
import { TestController } from "./resources/test/test.controller";
import { TextToSpeechService } from "./services/text-to-speach.service";
import { GoogleCloudStorageService } from "./services/file-storage.service";
import { CourseModule } from "./resources/course/course.module";
import { LevelModule } from './resources/level/level.module';
import { WordModule } from './resources/word/word.module';

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
  ],
  controllers: [TestController],
  providers: [TextToSpeechService, GoogleCloudStorageService],
})
export class AppModule { }
