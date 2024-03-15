import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { UserModule } from './resources/user/user.module';
import { MongooseConfigModule } from './common/database/database.module';
import { AuthModule } from './resources/auth/auth.module';
import { ApplicationModule } from './resources/applications/application.module';
import { TranslateModule } from './resources/translate/translate.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MongooseConfigModule,
    AuthModule,
    ApplicationModule,
    TranslateModule
  ],
  controllers: [],
})
export class AppModule { }
