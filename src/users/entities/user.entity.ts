import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'The login of the user',
    example: 'john_doe'
  })
  login: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123'
  })
  password: string;

  @ApiProperty({
    description: 'The version of the user record',
    example: 1
  })
  version: number;

  @ApiProperty({
    description: 'The timestamp when the user was created',
    example: 1625097600000
  })
  createdAt: number;

  @ApiProperty({
    description: 'The timestamp when the user was last updated',
    example: 1625097600000
  })
  updatedAt: number;
} 