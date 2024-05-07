import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GptWordDto {
  @ApiProperty({
    description: 'The word to be transcribed',
    example: 'apple'
  })
  @IsNotEmpty({ message: 'The word is required.' })
  @IsString({ message: 'The word must be a string.' })
  word: string;
}
