import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Current password of the user',
    example: 'oldPassword123'
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'newPassword123'
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
} 