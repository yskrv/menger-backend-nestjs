import { Injectable } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const {
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_PRIVATE_KEY_ID,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID
} = process.env;

@Injectable()
export class TextToSpeechService {
  private client: TextToSpeechClient;

  constructor() {
    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    this.client = new TextToSpeechClient({
      credentials: {
        private_key_id: GOOGLE_PRIVATE_KEY_ID,
        private_key: privateKey,
        client_email: GOOGLE_CLIENT_EMAIL,
        client_id: GOOGLE_CLIENT_ID,
      },
      projectId: GOOGLE_CLOUD_PROJECT_ID,
    })
  }

  async convertTextToSpeech(text: string, voice: string = 'en-US-Wavenet-D'): Promise<Buffer> {
    const request = {
      input: { text },
      voice: { languageCode: 'en-US', name: voice },
      audioConfig: { audioEncoding: 'MP3' as const },
    };

    const [response] = await this.client.synthesizeSpeech(request);
    if (!Buffer.isBuffer(response.audioContent)) {
      throw new Error('Expected audio content to be a Buffer');
    }
    return response.audioContent;
  }

  async listAvailableVoices(): Promise<any> {
    const [result] = await this.client.listVoices();
    const filteredVoices = result.voices.filter(voice =>
      voice.languageCodes.includes('en-US')
    );
    return result;
  }
}
