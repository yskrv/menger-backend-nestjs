import { Module } from "@nestjs/common";
import { TranslateService } from "./translate.service";
import { TranslateController } from "./translate.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [TranslateService],
  controllers: [TranslateController],
})
export class TranslateModule {}
