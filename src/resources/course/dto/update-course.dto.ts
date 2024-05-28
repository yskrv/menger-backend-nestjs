import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {
  @ApiProperty({
    description: 'Slug of the course',
    example: 'nest-intro-course'
  })
  @IsNotEmpty({ message: 'Slug is required' })
  @IsString({ message: 'Slug must be a string' })
  slug: string;

  @ApiProperty({
    description: 'Title of the course',
    example: 'Introduction to NestJS'
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the course',
    example: 'Learn NestJS from scratch with comprehensive tutorials and hands-on projects.'
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'List of benefits from taking the course',
    example: ['Hands-on experience', 'Real world applications']
  })
  @IsString({ message: 'At least one benefit is required' })
  benefits: string;

  @ApiProperty({
    description: 'Price of the course',
    example: 50
  })
  price: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Course image file'
  })
  @IsOptional()
  file: Express.Multer.File;

}
