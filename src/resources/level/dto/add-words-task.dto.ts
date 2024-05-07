import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class AddWordsTaskDto {
  @ApiProperty({ description: 'LevelId associated with the words task', type: String, required: true })
  @IsNotEmpty({ message: "LevelId required" })
  @IsMongoId({ message: 'LevelId must be a valid MongoDB ObjectId' })
  levelId: Types.ObjectId;

  @ApiProperty({ description: 'WordsTaskId associated with the level', type: String, required: true })
  @IsNotEmpty({ message: "WordsTaskId required" })
  @IsMongoId({ message: 'WordsTaskId must be a valid MongoDB ObjectId' })
  wordsTaskId: Types.ObjectId;
}