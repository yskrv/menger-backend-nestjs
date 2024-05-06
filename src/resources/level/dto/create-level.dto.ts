import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLevelDto {
  @ApiProperty({ description: 'Title of the level' })
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({ description: 'Description of the level' })
  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({ description: 'CourseId associated with the level', type: String, required: false })
  @IsNotEmpty({ message: "CourseId required" })
  @IsMongoId({ message: 'CourseId must be a valid MongoDB ObjectId' })
  courseId?: Types.ObjectId;
}
