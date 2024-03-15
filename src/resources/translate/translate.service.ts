import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const { GOOGLE_TRANSLATE_API_KEY } = process.env;

@Injectable()
export class TranslateService {
  constructor(private httpService: HttpService) { }

  async translate(text: string, targetLang: string): Promise<any> {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    const data = {
      q: text,
      target: targetLang,
      format: 'text',
    };
  
    try {
      const response = await firstValueFrom(this.httpService.post(url, data));
      return response.data.data.translations;
    } catch (error) {
      console.error('Error during translation:', error);
      throw error;
    }
  }
}
