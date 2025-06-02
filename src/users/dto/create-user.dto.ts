import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The login of the user',
    example: 'john_doe'
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
