import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateApplicationDto {
  @ApiProperty({
    description: "The full name of the applicant",
    example: "Test Testov",
  })
  @IsNotEmpty({ message: "Full name is required" })
  @IsString({ message: "Full name must be a string" })
  fullName: string;

  @ApiProperty({
    description: "Name of the organization",
    example: 'TOO "Test Org."',
  })
  @IsNotEmpty({ message: "Organization name is required" })
  @IsString({ message: "Organization name must be a string" })
  organizationName: string;

  @ApiProperty({
    description: "Email address of the applicant",
    example: "test@example.com",
  })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({
    description: "Contact phone number of the applicant",
    example: "+1234567890",
  })
  @IsNotEmpty({ message: "Phone number is required" })
  @IsPhoneNumber("KZ", { message: "Invalid phone number" })
  phoneNumber: string;

  @ApiProperty({
    description: "Text of the application",
    example: "Lorem ipsum...",
  })
  @IsNotEmpty({ message: "Text is required" })
  text: string;

  @ApiProperty({
    description: "Date of meeting",
    example: new Date().toISOString().slice(0, -5) + "Z",
  })
  meetingDate: string;

  meetingStartUrl?: string;
  meetingJoinUrl?: string;
}
