import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { UserModule } from './resources/user/user.module';
import { MongooseConfigModule } from './common/database/database.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MongooseConfigModule
  ],
  controllers: []
})
export class AppModule { }
