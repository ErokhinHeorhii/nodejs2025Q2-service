import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The name of the album',
    example: 'A Night at the Opera',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The year the album was released',
    example: 1975,
    required: false,
  })
  year?: number;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'The ID of the artist who created the album',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
    required: false,
  })
  artistId?: string | null;
}
