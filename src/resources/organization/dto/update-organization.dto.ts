import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateOrganizationDto {
  @ApiProperty({
    description: 'Name of the organization',
    example: 'Astana IT University'
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Slug of the organization',
    example: 'aitu'
  })
  @IsNotEmpty({ message: 'Slug is required' })
  @IsString({ message: 'Slug must be a string' })
  slug: string;

  @ApiProperty({
    description: 'Description of the organization',
    example: 'IT University from Astana'
  })
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Organization image file'
  })
  @IsOptional()
  file?: Express.Multer.File;

  @ApiProperty({
    description: 'Image of the organization',
  })
  @IsString({ message: 'Image name must be a string' })
  @IsOptional()
  imageUrl?: string;

}
