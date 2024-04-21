import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

const { GOOGLE_TRANSLATE_API_KEY } = process.env;

@Injectable()
export class TranslateService {
  constructor(private httpService: HttpService) {}

  async translate(text: string, targetLang: string): Promise<any> {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    const data = {
      q: text,
      target: targetLang,
      format: "text",
    };

    try {
      const axiosResponse = await this.httpService.axiosRef.post(url, data);
      return axiosResponse.data.data.translations;
    } catch (error) {
      console.error("Error during translation:", error);
      throw new HttpException(
        "Failed to translate text",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
