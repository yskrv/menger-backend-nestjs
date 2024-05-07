import { BadRequestException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GenerateTranscriptionOfWordDto } from "./dto/generate-transcription-word.dto";

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

  async generateTranscriptionOfWord(dto: GenerateTranscriptionOfWordDto) {
    const propmt =
      `Write the transcription of the word \`${dto.word}\` using the International Phonetic Alphabet (IPA). Example: For the word \`hello\`, the transcription is \`həˈloʊ\`. Please provide the transcription for \`${dto.word}\`. Response should be like object with field 'transcription'`;
    return await this.sendRequestToGpt(propmt);
  }
}