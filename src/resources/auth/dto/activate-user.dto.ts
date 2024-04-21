import { ApiProperty } from "@nestjs/swagger";

export class ActivateUserDto {
  @ApiProperty({
    description: "The activation code of the user",
    example: "123456",
  })
  activationCode: string;
}
