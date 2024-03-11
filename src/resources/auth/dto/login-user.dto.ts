import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'test@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'Qwerty123!',
  })
  password: string;
}
