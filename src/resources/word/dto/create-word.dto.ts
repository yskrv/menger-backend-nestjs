import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString } from 'class-validator';
import { Express } from 'express';

enum VoiceType {
  'en-US-Casual-K' = "en-US-Casual-K",
  'en-US-Neural2-D' = "en-US-Neural2-D",
  'en-US-Wavenet-B' = "en-US-Wavenet-B",
  'en-US-Journey-F' = "en-US-Journey-F",
  'en-US-Neural2-E' = "en-US-Neural2-E",
  'en-US-Studio-O' = "en-US-Studio-O"
}

export class CreateWordDto {
  @ApiProperty({
    description: 'Kazakh translation of the word',
    example: 'Сәлем',
    required: true
  })
  @IsNotEmpty({ message: 'The Kazakh translation must not be empty.' })
  @IsString({ message: 'The Kazakh translation must be string' })
  kaz: string;

  @ApiProperty({
    description: 'English translation of the word',
    example: 'Hello',
    required: true
  })
  @IsNotEmpty({ message: 'The English translation must not be empty.' })
  @IsString({ message: 'The English translation must be string' })
  eng: string;

  @ApiProperty({
    description: 'Transcription of the word',
    example: 'həˈləʊ',
    required: true
  })
  @IsNotEmpty({ message: 'Transcription must not be empty.' })
  @IsString({ message: 'Transcription must be string' })
  transcription: string;

  @ApiProperty({
    enum: VoiceType,
    description: 'Voice type for the pronunciation of the word',
    required: true
  })
  @IsNotEmpty({ message: 'Voice type must not be empty.' })
  @IsEnum(VoiceType, { message: 'Must be a valid voice type.' })
  voice: VoiceType;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Word image file'
  })
  @IsOptional()
  file: Express.Multer.File;
}
