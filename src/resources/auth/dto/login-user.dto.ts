import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    description: "The email address of the user",
    example: "adilzhexenoff@gmail.com",
  })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({
    description: "The password for the user account",
    example: "Qwerty123!",
  })
  @IsString({ message: "Password must be a string" })
  @IsStrongPassword({ minUppercase: 1, minLowercase: 1, minLength: 8, minNumbers: 1, minSymbols: 1 }, { message: "Your password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol" })
  password: string;
}
