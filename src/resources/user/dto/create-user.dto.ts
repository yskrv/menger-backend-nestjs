import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { UserRole } from "src/utils/enums";

export class CreateUserDto {
  @ApiProperty({
    description: "The first name of the user",
    example: "Test",
  })
  firstName: string;

  @ApiProperty({
    description: "The last name of the user",
    example: "Test",
  })
  lastName: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "test@example.com",
  })
  email: string;

  @ApiProperty({
    description: "The password for the user account",
    example: "Qwerty123!",
  })
  password: string;

  @ApiProperty({
    description: 'Code for account activation',
    example: {
      code: "123456",
      expiresIn: new Date()
    },
  })
  @IsOptional()
  activationCode?: {
    code: string;
    expiresIn: Date;
  };

  @IsOptional()
  isActivated?: boolean;

  @IsOptional()
  role?: UserRole;
}
