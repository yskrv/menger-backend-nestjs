import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'Test'
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Test'
  })
  lastName: string;

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
