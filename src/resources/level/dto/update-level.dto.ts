import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateLevelDto {
  @ApiProperty({ description: 'Title of the level' })
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({ description: 'Description of the level' })
  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
