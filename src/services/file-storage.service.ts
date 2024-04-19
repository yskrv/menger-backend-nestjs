import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

const {
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_PRIVATE_KEY_ID,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_BUCKET_NAME
} = process.env;

@Injectable()
export class GoogleCloudStorageService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    this.storage = new Storage({
      credentials: {
        private_key_id: GOOGLE_PRIVATE_KEY_ID,
        private_key: privateKey,
        client_email: GOOGLE_CLIENT_EMAIL,
        client_id: GOOGLE_CLIENT_ID,
      },
      projectId: GOOGLE_CLOUD_PROJECT_ID,
    });

    this.bucketName = GOOGLE_BUCKET_NAME;
  }

  async uploadFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);

    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folderName}/${uuidv4()}.${fileExtension}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();

    await new Promise<void>((resolve, reject) => {
      blobStream.on('error', (err) => reject(err));
      blobStream.on('finish', async () => {
        await blob.makePublic();
        resolve();
      });
      blobStream.end(file.buffer);
    });

    return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fileName)}`;
  }

  async uploadBuffer(
    buffer: Buffer,
    folderName: string,
    mimetype: string = 'audio/mpeg',
  ): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const fileName = `${folderName}/${uuidv4()}.mp3`; 
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
    });

    await new Promise<void>((resolve, reject) => {
      blobStream.on('error', err => reject(err));
      blobStream.on('finish', async () => {
        await blob.makePublic();
        resolve();
      });
      blobStream.end(buffer);
    });

    return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fileName)}`;
  }
}