import { Body, Controller, Post } from "@nestjs/common";
import { TranslateService } from "./translate.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("translate")
@Controller("translate")
export class TranslateController {
  constructor(private translateService: TranslateService) {}

  @Post("/en")
  translateToEnglish(@Body("text") text: string) {
    return this.translateService.translate(text, "en");
  }

  @Post("/kk")
  translateToKazakh(@Body("text") text: string) {
    return this.translateService.translate(text, "kk");
  }
}
