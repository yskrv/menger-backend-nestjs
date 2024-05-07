import { BadRequestException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GptWordDto } from "./dto/gpt-word.dto";

@Injectable()
export class GptService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.GPT_SECRET_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  private async sendRequestToGpt(prompt: string) {
    const data = {
      model: "gpt-4-turbo",
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ],
      temperature: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    try {
      const response = await this.httpService.post(this.apiUrl, data, { headers }).toPromise();
      return response.data.choices[0].message.content
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  async generateTranscriptionOfWord(dto: GptWordDto) {
    const prompt =
      `Write the transcription of the word \`${dto.word}\` using the International Phonetic Alphabet (IPA). Example: For the word \`hello\`, the transcription is \`həˈloʊ\`. Please provide the transcription for \`${dto.word}\`. Response should be like object with field 'transcription'`;
    return await this.sendRequestToGpt(prompt);
  }

  async generateWrongOptionsForWordsTask(dto: GptWordDto) {
    const prompt =
      `Provide three incorrect translation options for the word \`${dto.word}\` (given in either English or Kazakh). These options should be in the opposite language of the provided word. For example, if \`${dto.word}\` is in English, provide wrong options in Kazakh, and vice versa. Response should be like object with field 'wrongOptions', which contain array with 3 strings.`;
    return await this.sendRequestToGpt(prompt);
  }
}