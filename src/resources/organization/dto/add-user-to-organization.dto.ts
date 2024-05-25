import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddUserToOrganizationDto {
  @ApiProperty({
    description: "The first name of the user",
    example: "Test",
  })
  @IsNotEmpty({ message: "First name is required" })
  @IsString({ message: "First name must be a string"})
  firstName: string;

  @ApiProperty({
    description: "The last name of the user",
    example: "Test",
  })
  @IsNotEmpty({ message: "Last name is required" })
  @IsString({ message: "Last name must be a string"})
  lastName: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "test@example.com",
  })
  @IsNotEmpty({ message: "Email is required" })
  @IsString({ message: "Email must be a string"})
  email: string;
}
