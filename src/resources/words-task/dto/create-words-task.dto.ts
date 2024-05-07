import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, ArrayMaxSize, IsNotEmpty, IsBoolean, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateWordsTaskDto {
  @ApiProperty({
    description: 'MongoDB ObjectId for the word',
    type: String,
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId({ message: 'WordId must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'WordId must not be empty' })
  wordId: Types.ObjectId;

  @ApiProperty({
    description: 'MongoDB ObjectId for the level',
    type: String,
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId({ message: 'LevelId must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'LevelId must not be empty' })
  levelId: Types.ObjectId;

  @ApiProperty({
    description: 'Array of incorrect options, exactly three required',
    type: [String],
    example: ['Incorrect1', 'Incorrect2', 'Incorrect3']
  })
  @IsArray({ message: 'Wrong options must be an array' })
  @ArrayMinSize(3, { message: 'There must be exactly three wrong options' })
  @ArrayMaxSize(3, { message: 'There must be exactly three wrong options' })
  @IsNotEmpty({ each: true, message: 'Each wrong option must not be empty' })
  wrongOptions: string[];

  @ApiProperty({
    description: 'Points awarded for completing the task',
    example: 10,
    type: Number
  })
  @IsNumber({}, { message: 'Points must be a number' })
  @IsNotEmpty({ message: 'Points must not be empty' })
  points: number;

  @ApiProperty({
    description: 'Diamonds awarded for completing the task',
    example: 5,
    type: Number
  })
  @IsNumber({}, { message: 'Diamonds must be a number' })
  @IsNotEmpty({ message: 'Diamonds must not be empty' })
  diamonds: number;

  @ApiProperty({
    description: 'Flag indicating if the task is in Kazakh language',
    example: true,
    type: Boolean
  })
  @IsBoolean({ message: 'IsKazakh must be a boolean value' })
  @IsNotEmpty({ message: 'IsKazakh must not be empty' })
  isKazakh: boolean;
}
